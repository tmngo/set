const Express = require('express');
const app = Express();
// const server = require('http').createServer(app);


app.use(Express.static(__dirname + "\\..\\client\\dist"))

app.listen(process.env.PORT || 8000);
