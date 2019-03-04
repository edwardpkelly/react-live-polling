const express = require('express');
const app = express();
const server = require('http').Server(app);
const socketio = require('socket.io')(server);
const PORT = 3000;

let connections = [];

app.use(express.static('./public'));
app.use(express.static('./node_modules/bootstrap/dist'));

server.listen(PORT, () => {
    console.log(`Live Polling App Running on Port ${PORT}`);
});

socketio.on('connection', (socket) => {
    socket.once('disconnect', () => {
        connections.splice(connections.indexOf(socket), 1);
        socket.disconnect();
        console.log(`Disconnected. ${connections.length} connections remaining.`);
    });
    connections.push(socket);
    console.log(`Connected! ${connections.length} connections.`);
});