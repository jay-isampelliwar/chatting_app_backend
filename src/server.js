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
    io.emit("message", {
      data: data,
      isJoin: false,
    });
  });

  socket.on("newUserJoin", (data) => {
    users.push(data);
    io.emit("newUserJoin", {
      data: data,
      isJoin: true,
      length: users.length,
    });
  });

  socket.on("leaveChat", (data) => {});
});

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
