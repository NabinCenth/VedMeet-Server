const crypto = require('crypto');

function generateUniqueId() {
  return crypto.randomBytes(8).toString('hex');  
}
function handleSocketConnection(socket,io) {
socket.on('createRoom',()=>{
  const roomId = generateUniqueId();
  socket.join(roomId);
  socket.emit('room-created',{roomId});
});
socket.on('joinRoom',(data)=>{
  socket.join(data.roomId);
 console.log(data);
});
socket.on('offer',(data)=>{
  socket.to(data.RoomId).emit('offer', { offer: data.offer });
  console.log("offers are received");
});
socket.on('answer',(data)=>{
  socket.to(data.RoomId).emit('answer', { answer: data.answer });
  console.log("answer", data);
});
socket.on("ice-candidate", (data) => {
  socket.to(data.RoomId).emit("ice-candidate", { candidate: data.candidate });
console.log("ICE candidate received:");
});
}
module.exports = { handleSocketConnection };