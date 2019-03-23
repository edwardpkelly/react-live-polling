const express = require('express');
const app = express();
const server = require('http').Server(app);
const socketio = require('socket.io')(server);

const PORT = require('./server/server-constants').PORT;

app.use(express.static('./public'));
app.use(express.static('./node_modules/bootstrap/dist'));

server.listen(PORT, () => {
    console.log(`Live Polling App Running on Port ${PORT}`);
});

require('./server/socket-config')(socketio);