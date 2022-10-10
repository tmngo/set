<template>
  <div 
    class="game-body" 
    :class="{ 'pink': colorState === 1, 'blue': colorState === 2 }"
  >
  <div class="game-container"
  >
    <div class="bar">
      <h1>Set {{ score > 0 ? "(×" + score + ")" : "" }}</h1>
      <button 
        style="border: none; box-shadow: none; border-radius: 0"
        @click="showMenu=!showMenu">{{ showMenu ? '&#x2573;' : '&#9776;' }}</button>
    </div>
    <div class="bar menu" :class="{'menu-hidden': !showMenu}">
      <div style="color: #505050;display: flex; flex-direction: column;font-size: 0.75rem; align-self: flex-start;position: absolute">
        <div 
          v-for="p in players" 
          :key="p.id"
        >{{ `${p.username}: ×${p.score} (-${p.penalties})` }}</div>
      </div>
      <div class="join-room" >
        <label>ROOM:</label>
        <input 
          type="text" 
          v-model="roomName"
          autocapitalize="off"
        >
        <a class="a-button" :href="roomUrl">JOIN</a>
      </div>
      <div class="join-room" >
        <label>NAME:</label>
        <input 
          type="text" 
          v-model="username"
          autocapitalize="off"
          @keyup.enter="changeName(username)">
        <button 
          class="a-button" 
          style="box-shadow: none"
          @click="changeName(username)"
        >EDIT</button>
      </div>
      <button 
        @click="colors = colorSets[(++colorIndex)%colorSets.length]"
      >Change colors</button>
      <button @click="loadSavedGame(2)">Load test game</button>
    </div>
    <div class="bar">
    <div class="info" :class="{'hidden': loading}">{{ setExists ? "A SET EXISTS." : "NO SETS EXIST." }}</div>
    <div class="controls">
      <button @click="drawCards()">Draw</button>
      <button @click="rotateBoard()">Rotate</button>
      <button @click="newGame()">New game</button>
    </div>
    </div>
    <div class="board"
      :class="[this.rotation === 0 ? 'board-v' : 'board-h', this.rawCards.length > 12 ? 'board-v5' : 'board-v4']"
    >
      <set-card
        v-for="(card, i) in displayCards"
        :key="i"
        :card="card"
        :color="colors[card.color]"
        @click.native.prevent="selectCard(i)"
        :selected="selection[i]"
        :isLoading="loading"
        :rotation="rotation"
      ></set-card>
    </div>
    
  </div>
  </div>
</template>

<script>
/* eslint-disable */
import io from "socket.io-client";
import SetCard from "./SetCard.vue"

export default {
  name: 'SetGame',
  components: {
    SetCard
  },
  
  data() {
    return {
      sock: {},
      rawCards: [],
      selection: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      colors: [
        "#ff3311",
        "#33c055",
        "#6622c0",
      ],
      colorSets: [
        ["#ff3311","#33c055","#6622c0"],
        ["#222222","#33c055","#6622c0"],
        ["#ff3311","#222222","#6622c0"],
        ["#cccccc","#777777","#000000"],
        ["#9922c0","#1520ff","#ddd022"],
      ],
      colorIndex: 0,
      loading: false,
      submitting: false,
      showConsole: false,
      showMenu: false,
      rotation: 0,
      players: [],
      colorState: 0,
      roomName: "",
      username: "",
      score: 0,
      userId: "",
    }
  },
  watch: {

  },
  computed: {
    cards() {
      let arr = [];
      for (let i = 0; i < this.rawCards.length; i++) {
        arr.push({
          count: this.rawCards[i] / 27 | 0,
          color: this.rawCards[i] / 9 % 3 | 0,
          shape: this.rawCards[i] / 3 % 3 | 0,
          shading: this.rawCards[i] % 3 | 0,
        })
      }
      return arr;
    },
    baseUrl() {
      return location.href.slice(0, location.href.lastIndexOf('/')+1);
    },
    socketUrl() {
      return "wss://" + location.host + "/" + this.roomName;
    },
    roomUrl() {
      return "https://" + location.host + "/" + this.roomName;
    },
    displayCards() {
      let arr = [...this.cards];
      for (let i = 0; i < Math.max(12-this.rawCards.length, 0); i++) {
        arr.push({
          count: -1,
          color: 0,
          shape: 0,
          shading: 0,
        })
      }
      return arr;
    },
    selectedCards() {
      let arr = [];
      for (let i = 0; i < this.selection.length; i++) {
        if (this.selection[i] !== -1) {
          arr.push(this.selection[i])
        }
      }
      return arr;
    },
    selectedIndices() {
      let arr = [];
      for (let i = 0; i < this.selection.length; i++) {
        if (this.selection[i] !== -1) {
          arr.push(i)
        }
      }
      return arr;
    },
    setExists() {
      let n = this.rawCards.length;
      let C1 = this.rawCards.slice(0,n/2);
      let C2 = this.rawCards.slice(n/2);
      for (let i = 0; i < C1.length - 1; i++) {
        for (let j = i; j < C1.length - 1; j++) {
            let card = this.computeLastCard(C1[i], C1[j+1]);
            if (this.rawCards.indexOf(card) > -1) {
              return true;
            }
        }
      }
      for (let i = 0; i < C2.length - 1; i++) {
        for (let j = i; j < C2.length - 1; j++) {
            let card = this.computeLastCard(C2[i], C2[j+1]);
            if (this.rawCards.indexOf(card) > -1) {
              return true;
            }
        }
      }
      return false;
    }
  },
  created() {
    this.connect();
    window.onkeydown = (e) => {
      if (e.key === "`" && e.ctrlKey) {
        this.loadSavedGame(2);
      }
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    connect() {
      this.roomName = location.href.substr(location.href.lastIndexOf('/') + 1);
      if (this.roomName !== "") {
        window.document.title = "Set | " + this.roomName;
      }

      if (location.hostname === "localhost") {
        // Development
        this.sock = new WebSocket("ws://localhost:8000");
      } else {
        // Production
        this.sock = new WebSocket(this.socketUrl);
      }

      this.sock.onopen = (e) => {
        console.log("Connected!")
        this.sockEmit("user-connected", this.userId);
      }

      this.sock.onclose = (e) => {
        console.log("Disconnected!")
        setTimeout(() => {
          console.log("Attempting to reconnect...")
          this.connect();
          this.init();
        }, 1000);
      }
      setTimeout(() => {
        this.selection = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
        this.submitting = false;
      }, 350)
    },
    init() {
      this.sock.onmessage = (event) => {
        const obj = JSON.parse(event.data);
        const msg = obj.message;
        const data = obj.data;
        console.log("IN: " + msg)
        switch (msg) {
          case "new-game":
            this.rawCards = [];
            this.score = 0;
            break;
          case "load-game":
            setTimeout(() => {
              this.rawCards = data;
            }, 350)
            break;
          case "set-user-id":
            this.userId = data.id;
            this.username = data.name;
            console.log(`User ID set to [${data.id}]`)
            break;
          case "update-players":
            let arr = [];
            for (const p in data) {
              arr.push(data[p])
            }
            this.players = [...arr]
            console.log("Players updated.")
            break;
          case "draw-card":
            this.rawCards.push(data)
            break;
          case "valid-set":
            this.flashColorServer(true);
            this.score = data.score;
            setTimeout(() => {
              this.selection = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
              this.submitting = false;
            }, 350)
            break;
          case "invalid-set":
            this.flashColorServer(false);
            setTimeout(() => {
              this.selection = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
              this.submitting = false;
            }, 350)
            break;
          case "time":
            console.log(data)
            break;
        }
      setTimeout(()=>{this.loading=false}, 200)
      }
    },
    changeName(name) {
      this.sockEmit("change-name", name)
    },
    flashColor(indices) {
      let isSet = this.rawCards[indices[2]] === this.computeLastCard(this.rawCards[indices[0]], this.rawCards[indices[1]])
      this.colorState = isSet ? 1 : 2;
      setTimeout(()=>{
        this.colorState = 0;
      }, 350)
    },
    flashColorServer(isSet) {
      this.colorState = isSet ? 1 : 2;
      setTimeout(()=>{
        this.colorState = 0;
      }, 350)
    },
    computeLastCard(c1, c2) {
      let c3 = 0;
      for (let i = 0; i < 4; i++) {
        let a = c1 / (3**i) % 3 | 0;
        let b = c2 / (3**i) % 3 | 0;
        c3 += (a === b) ? a * 3**i : (3-a-b) * 3**i;
      }
      return c3;
    },
    sockEmit(message, data) {
      console.log("OUT: " + message)
      this.sock.send(JSON.stringify({
        message: message,
        data: data,
      }));
    },
    newGame() {
      this.loading = true;
      this.sockEmit("new-game")
    },
    loadSavedGame(index) {
      let savedGames = [
        [
          0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,
          27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,
          54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80
        ],
        [
          0,1,2,3,4,5,6,7,8,9,10,11,12,13,14
        ],
        [
          73,2,47,53,66,32,74,52,46,15,49,56,9,50,12,19,61,44,22,62,65,79,31,40,13,37,70,
          63,24,54,39,7,27,25,14,43,20,6,8,58,45,59,67,28,78,76,60,33,11,10,48,4,42,1,
          5,38,21,35,3,72,75,18,0,23,16,71,69,68,41,17,36,29,57,26,51,55,77,64,30,80,34
        ],
        [
          73,2,47,53,66,32,74,52,46,15,49,56,9,50,12
        ]
      ]
      if (index < savedGames.length) {
        this.loadGame(savedGames[index])
      }
    },
    loadGame(arr) {
      this.loading = true;
      if (arr.length > 0) {
        this.sockEmit("load-new-game", arr)
      }
    },
    drawCards() {
      if (this.rawCards.length < 15) {
        this.sockEmit("draw-cards")
      }
    },
    selectCard(i) {
      if (this.submitting) {
        return;
      }
      let card = this.rawCards[i];
      this.$set(this.selection, i, this.selection[i] === -1 ? card : -1);
      if (this.selectedCards.length === 3) {
        this.submitSet(this.selectedIndices);
      }
    },
    submitSet(indices) {
      this.submitting = true;
      // this.flashColor(indices);
      this.sockEmit("submit-set", indices);
      
    },
    rotateBoard() {
      this.rotation = this.rotation === 0 ? 90 : 0;
    }
  }
}
</script>

<style scoped>
.game-body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 1rem;
  outline: solid 2vw #ffffff00;
  outline-offset: -1vw;
  transition: all 0.2s ease-in-out;
  
}
.game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin: 0;
  padding: 0;
}
.controls {
  display: flex;
}
.board {
  display: grid;
  grid-gap: 1.5vw;
  padding: 0.5rem 0;
  max-width: 800px;
  width: 100%;
  height: 100%;
  flex-grow: 1;
}

.board-v {
  grid-auto-flow: column;
  grid-template: repeat(3, minmax(56px, 1fr)) / repeat(auto-fit, minmax(40px, 1fr));
}
.board-h {
  grid-auto-flow: row;
  grid-template: repeat(auto-fit, minmax(40px, 1fr)) / repeat(3, minmax(56px, 1fr));
}

@media screen and (max-width: 600px) {
  .board {
    padding-bottom: 0;
  }
  .board-v4 {
    grid-auto-flow: row;
    grid-template: repeat(4, minmax(40px,1fr)) / repeat(3, 1fr);
  }
  .board-v5 {
    grid-auto-flow: row;
    grid-template: repeat(5, minmax(40px,1fr)) / repeat(3, 1fr);
  }
}

.blank,
.blank:hover {
  border: 0.25rem #f0f0f0 double;
  cursor: auto;
  background: #f8f8f8;
  border-radius: 10%;
  transform:translateY(0);
  box-shadow: none;
}
.join-room {
  display: flex;
  justify-content: flex-end;
  max-width: 800px;
  align-items: flex-end;
}

.bar {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 800px;
  align-items: center;
  margin-bottom: 0.25rem;
}

.bar h1 {
  height: 30px;
  line-height: 30px;
  font-size: 1.25rem;
  margin: 0;
  white-space: nowrap;
}

.info {
  align-self: flex-end;
  font-size: 0.75rem;
}
.hidden {
  opacity: 0;
}
button,
.a-button {
  margin-left: 0.5rem;
  border: solid 1px #404040;
  background: #fff;
  color: #505050;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: bold;
  text-transform: uppercase;
  padding: 0 .5rem;
  cursor: pointer;
  text-shadow: 0 1px 2px rgba(10,10,10,.1);
  transition: all 0.15s ease;
  white-space: nowrap;
  height: 30px;
  line-height: 30px;
  text-decoration: none;
}


button:hover,
.a-button:hover {
  color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.24);
  background-color: #404040;
  transform: translateY(-1px);
}

button {
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
}

button:active,
.a-button:active {
  background-color: #303030;
  transform: translateY(1px);
}

.join-room label {
  font-size: 0.75rem;
  border: solid 1px #808080;
  color: #505050;
  height: 30px;
  line-height: 30px;
  padding: 0 .5rem;
  border-radius: 4px 0 0 4px;
  border-right: none;
  margin: 0;
}

.join-room input {
  border: solid 1px #808080;
  color: #505050;
  height: 30px;
  font-size: 0.75rem;
  line-height: 30px;
  padding: 0 .5rem;
  border-radius: 0px 0 0 0px;
  border-right: none;
  width: 5rem;
  margin: 0;
}
.a-button {
  border-radius: 0 4px 4px 0;
  margin-left: 0;
}

.menu {
  flex-direction: column;
  height: 10rem;
  padding: 0.5rem 0;
  align-items: flex-end;
  justify-content: flex-start;
  transition: all 0.25s cubic-bezier(0.075, 0.82, 0.165, 1);
  position: relative;
}

.menu > * {
  margin-bottom: 0.3rem;
}

.menu::after {
  background-image: linear-gradient(-90deg,rgba(255,255,255,0) 0,#000 25%,#000 75%,
  rgba(255,255,255,0) 100%);
  content: "";
  height: 1px;
  opacity: .18;
  position: absolute;
  bottom: 3px;
  width: 100%;
}

.menu-hidden {
  opacity: 0;
  padding: 0;
  margin: 0;
  height: 0;
  overflow: hidden;
}

.pink {
  outline: solid 2vw #dd449988 !important;
  outline-offset: -1vw;
}

.blue {
  outline: solid 2vw #2288cc88 !important;
  outline-offset: -1vw;
}
</style>
