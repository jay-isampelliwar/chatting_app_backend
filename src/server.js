const express = require("express");
const app = express();
const { createServer } = require("http");
const server = createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const PORT = process.env.PORT || 3000;

const users = [];
app.get("/", (req, res) => {
  res.send("Home Page");
});

io.on("connection", (socket) => {
  socket.on("message", (data) => {
    io.emit("message", data);
  });

  socket.on("newUserJoin", (data) => {
    users.push(date);
    io.emit("newUserJoin", {
      data: data,
      length: users.length,
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
