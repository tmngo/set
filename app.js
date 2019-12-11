'use strict';
const express = require('express');
const WebSocket = require('ws');

const PORT = process.env.PORT || 8000;

const app = express();
app
  .use(express.static(__dirname + "/dist/"))
  .get('/*', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html');
  })


const server = require('http').createServer(app);
const wss = new WebSocket.Server({ server: server })

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

function emit(ws, message, data) {
  ws.send(JSON.stringify({
    message: message,
    data: data,
  }));
}

function broadcast(wss, ws, message, data) {
  wss.clients.forEach((client) => {
    if (client.url === ws.url && client.readyState === WebSocket.OPEN) {
      emit(client, message, data)
    }
  });
}

let numClients = 0;
let players = {};
let rooms = {};
let deleteTimeout;

wss.on('connection', (ws, req) => {

  /* OPEN CONNECTION */
  let id = ""; 
  clearTimeout(deleteTimeout);

  ws.url = req.url;
  let r = ws.url;
  if (!rooms.hasOwnProperty(ws.url)) {
    // Create new room
    rooms[r] = {
      numUsers: 1,
      players: {},
      existingGame: false,
    };
  } else {
    // Join existing room
    rooms[r].numUsers++;
  }

  console.log("(%s) clients across (%s) rooms.", numClients, Object.keys(rooms).length);
  for (const room in rooms) {
    console.log("room: %s (%s)", room, rooms[room].numUsers)
  }

  /** INITIALIZE GAME */
  if (numClients === 0 || rooms[ws.url].existingGame === false) {
    // Create new game
    startNewGame(wss, ws);
    rooms[ws.url].existingGame = true;
  } else {
    // Load existing game
    emit(ws, "load-game", rooms[ws.url].activeCards);
  }

  // Handle client input
  ws.on('message', (message) => {

    const obj = JSON.parse(message);
    const action = obj.message;
    const data = obj.data;
    console.log('Received "%s" from player "%s".', action, id);

    switch (action) {

      case "new-game":
        startNewGame(wss, ws);
        broadcast(wss, ws, "update-players", rooms[r].players);
        break;

      case "load-new-game":
        loadGame(wss, ws, data);
        broadcast(wss, ws, "update-players", rooms[r].players);
        break;

      case "user-connected":
        numClients++;
        if (data === "") {
          // new player
          id = uuidv4();
          let username = "player_" + id[0] + id[1] + id[2]
          rooms[r].players[id] = {
            score: 0,
            penalties: 0,
            username: username,
          }
          emit(ws, "set-user-id", {id: id, name: username});
          console.log("User [ %s ] connected at %s.", id, req.url);
        } else {
          // returning player
          id = data;
          console.log(`User [ %s ] reconnected to %s.`, id, req.url)
        }
        broadcast(wss, ws, "update-players", rooms[r].players);
        break;

      case "change-name":
        console.log("Name changed from [ %s ] to [ %s ].", players[id].username, data)
        players[id].username = data;
        broadcast(wss, ws, "update-players", rooms[r].players);
        break;

      case "submit-set":
        let cardObjects = parseCards(data, rooms[r].activeCards);
        let isValid = isSet(cardObjects);
        console.log("Indices: " + data.toString());
        console.log(`Raw cards: ${rooms[r].activeCards[data[0]]},${rooms[r].activeCards[data[1]]},${rooms[r].activeCards[data[2]]}`);
        console.log(cardObjects);
        console.log(isValid ? `Valid set from ${players[id].username}.` : `Invalid set from ${players[id].username}.`);
        if (isValid) {
          data.sort((a, b) => { return b - a; });
          for (let i = 0; i < data.length; i++) {
            if (rooms[r].deckIndex >= rooms[r].deck.length 
                || rooms[r].activeCards.length > 12) {
              rooms[r].activeCards.splice(data[i], 1);
            } else {
              rooms[r].activeCards[data[i]] = rooms[r].deck[rooms[r].deckIndex++];
            }
          }
          players[id].score++;
          broadcast(wss, ws, "load-game", rooms[r].activeCards);
          emit(ws, "valid-set");
        } else {
          players[id].penalties++;
          emit(ws, "invalid-set");
        }
        console.log(players)
        broadcast(wss, ws, "update-players", rooms[r].players);
        break;

      case "draw-cards":
        if (rooms[r].deckIndex < rooms[r].deck.length) {
          drawCards(wss, ws, 3);
        }
        break;

    }
  });

  /* Prevent Heroku server timeout */
  setInterval(() => { 
    let time = new Date().toTimeString(); 
    emit(ws, 'time', time)
  }, 30000);

  /** CLOSE */
  ws.on("close", function() {
    numClients--;

    if (rooms[r] !== undefined) {
      rooms[r].numUsers--;
      if (rooms[r].numUsers === 0) {
        // delete rooms[r]
        deleteTimeout = setTimeout(() => { delete rooms[r] }, 5000);
        console.log("Empty room deleted after 5 s.")
      }
    }

    console.log("User %s disconnected.", id);
    console.log("(%s) clients across (%s) rooms.", numClients, Object.keys(rooms).length);
    for (const room in rooms) {
      console.log("room: %s (%s)", room, rooms[room].numUsers)
    }
  })

})

/** GAME FUNCTIONS */

/* Creates a random sequence of numbers from 0 to n-1. */
function shuffledNumbers(n) {
  let arr = [];
  for (let i = 0; i < n; i++) {
    arr[i] = i;
  }
  return shuffle(arr);
}

/* Randomly sorts an array. */
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function startNewGame(wss, ws) {
  // deck = shuffledNumbers(81);
  rooms[ws.url].deck = shuffledNumbers(81)
  // rooms[ws.url].deck = []
  // for (let i = 50; i < 65; i++) {
  //   rooms[ws.url].deck.push(i)
  // }
  rooms[ws.url].deckIndex = 0;
  broadcast(wss, ws, "new-game", {});
  rooms[ws.url].activeCards = [];
  drawCards(wss, ws, 12)

  for (const player in players) {
    players[player].score = 0;
  }
}

function loadGame(wss, ws, arr) {
  rooms[ws.url].deck = arr
  rooms[ws.url].deckIndex = 0;
  broadcast(wss, ws, "new-game", {});
  rooms[ws.url].activeCards = [];
  drawCards(wss, ws, 12)

  for (const player in players) {
    players[player].score = 0;
  }
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function drawCard(wss, ws) {
  let card = rooms[ws.url].deck[rooms[ws.url].deckIndex++];
  rooms[ws.url].activeCards.push(card);
  broadcast(wss, ws, "draw-card", card);
}

function drawCards(wss, ws, n) {
  for (let i = 0; i < n; i++) {
    drawCard(wss, ws)
  }
}

function isSet(cards) {
  let props = ['count', 'color', 'shading', 'shape']
  let propSets = [false, false, false, false]

  for (let i = 0; i < props.length; i++) {
    if (cards[0][props[i]] === cards[1][props[i]]
      && cards[1][props[i]] === cards[2][props[i]]) {
      propSets[i] = true;
    } else if (cards[0][props[i]] !== cards[1][props[i]]
      && cards[1][props[i]] !== cards[2][props[i]]
      && cards[2][props[i]] !== cards[0][props[i]]) {
      propSets[i] = true;
    }
  }

  return propSets[0] && propSets[1] && propSets[2] && propSets[3];
}

function parseCards(indices, active) {
  let cards = [];
  for (let i = 0; i < indices.length; i++) {
    let raw = active[indices[i]]
    cards.push({
      count: raw / 27 | 0,
      color: raw / 9 % 3 | 0,
      shading: raw % 3 | 0,
      shape: raw / 3 % 3 | 0,
    })
  }
  return cards;
}