const express = require('express');
const app = express();
const server = require('http').Server(app);
const socketio = require('socket.io')(server);
const PORT = 3000;

let connections = [];
let audience = [];
let speaker = {};
let presentationTitle = 'Untitled Presentation';

app.use(express.static('./public'));
app.use(express.static('./node_modules/bootstrap/dist'));

server.listen(PORT, () => {
    console.log(`Live Polling App Running on Port ${PORT}`);
});

socketio.on('connection', socket => {
    socket.once('disconnect', () => {
        connections.splice(connections.indexOf(socket), 1);
        socket.disconnect();
        if (socket.id === speaker.id) {
            console.log(
                `${speaker.name} has left. ${presentationTitle} is over.`
            );
            speaker = {};
            presentationTitle = 'Untitled Presentation';
            socketio.sockets.emit('end', {
                title: presentationTitle,
                speaker: ''
            });
        } else {
            audience = audience.filter(item => {
                return item.id !== socket.id;
            });
            socketio.sockets.emit('audience', audience);
        }
        console.log(
            `Disconnected. ${connections.length} connections remaining.`
        );
    });

    socket.on('join', data => {
        const newMember = {
            id: socket.id,
            name: data.name,
            type: 'member'
        };
        socket.emit('joined', newMember);
        audience.push(newMember);
        socketio.sockets.emit('audience', audience);
    });

    socket.on('start', data => {
        const { name, title } = data;
        presentationTitle = title;
        speaker = {
            name,
            id: socket.id,
            type: 'speaker'
        };
        // Send 'joined' event to client
        socket.emit('joined', speaker);
        socketio.sockets.emit('start', { title, speaker: name });
    });

    socket.emit('welcome', {
        title: presentationTitle,
        audience,
        speaker: speaker.name
    });

    connections.push(socket);
    console.log(`Connected! ${connections.length} connections.`);
});
