const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const { handleSocketConnection } = require("./socketHandlers");
const app = express();
const server = http.createServer(app);
server.listen(5000, () => {
  console.log("Server is running on port 5000");
});
app.get("/", (req, res) => {
  res.send("Socket.IO server is running");
  
});
const io = new Server(server, {
  cors: { origin: ["http://localhost:5173", "http://localhost:5000"] },
});
io.on("connection", (socket) => {
  console.log("User connected", socket.id);
  handleSocketConnection(socket,io);
});
