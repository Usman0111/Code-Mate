const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const router = require("./router");

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users.js");

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("join", ({ name, room }, callback) => {
    console.log(`${name} has joined ${room}`);

    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.emit("message", {
      user: "admin",
      text: `${user.name} welcome to the room ${user.room}`,
    });

    socket.join(user.room);

    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name} has joined` });
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit("message", { user: user.name, text: message });
    callback();
  });

  socket.on("editCode", (code) => {
    const user = getUser(socket.id);
    socket.broadcast.to(user.room).emit("changedCode", code);
  });

  socket.on("runSignal", () => {
    const user = getUser(socket.id);
    socket.broadcast.to(user.room).emit("runSignal");
  });

  socket.on("completeSignal", (output) => {
    const user = getUser(socket.id);
    socket.broadcast.to(user.room).emit("completeSignal", output);
  });

  socket.on("editInput", (input) => {
    const user = getUser(socket.id);
    socket.broadcast.to(user.room).emit("changeInput", input);
  });

  socket.on("syncLanguage", (info) => {
    const user = getUser(socket.id);
    socket.broadcast.to(user.room).emit("syncLanguage", info);
  });

  socket.on("syncReset", () => {
    const user = getUser(socket.id);
    socket.broadcast.to(user.room).emit("syncReset");
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} has left.`,
      });
    }
  });
});

app.use(router);

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
