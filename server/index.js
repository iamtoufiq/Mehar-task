const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const PORT = 3001;

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("socket connected with socket id", socket.id);

  socket.on("join_room", (room) => {
    socket.join(room);
    console.log(`user with ID ${socket.id} joined romm : ${room}`);
  });

  socket.on("send_message", (data) => {
    // console.log(data);
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("socket disconnected from socket id", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
