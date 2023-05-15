const express = require("express");
const app = express();
const { createServer } = require("http");
const server = createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const PORT = process.env.PORT || 3000;

let users = [];
app.get("/", (req, res) => {
  res.send("Home Page");
});

io.on("connection", (socket) => {
  socket.on("message", (data) => {
    io.emit("message", {
      data: data,
      isJoin: false,
      isLeave: false,
    });
  });

  socket.on("newUserJoin", (data) => {
    users.push(data["username"]);
    io.emit("newUserJoin", {
      data: data,
      isJoin: true,
      isLeave: false,
      length: users.length,
    });
  });

  socket.on("userLeaveChat", (data) => {
    const index = users.indexOf(data["username"]);
    users = users.splice(index, 1);
    io.emit("newUserJoin", {
      data: data,
      isJoin: false,
      isLeave: true,
      length: users.length,
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
