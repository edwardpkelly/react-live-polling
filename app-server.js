const express = require("express");
const app = express();
const server = require("http").Server(app);
const socketio = require("socket.io")(server);
const PORT = 3000;

let connections = [];
let audience = [];
const title = "Untitled Presentation";

app.use(express.static("./public"));
app.use(express.static("./node_modules/bootstrap/dist"));

server.listen(PORT, () => {
  console.log(`Live Polling App Running on Port ${PORT}`);
});

socketio.on("connection", socket => {
  socket.once("disconnect", () => {
    connections.splice(connections.indexOf(socket), 1);
    socket.disconnect();

    audience = audience.filter(item => {
      return item.id !== socket.id;
    });
    socketio.sockets.emit('audience', audience);
    console.log(`Disconnected. ${connections.length} connections remaining.`);
  });

  socket.on('join', (data) => {
    const newMember = {
      id: socket.id,
      name: data.name
    };
    socket.emit('joined', newMember);
    audience.push(newMember);
    socketio.sockets.emit('audience', audience);
  });

  socket.emit("welcome", {
    title: title
  });

  connections.push(socket);
  console.log(`Connected! ${connections.length} connections.`);
});
