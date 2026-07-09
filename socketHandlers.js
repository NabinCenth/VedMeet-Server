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
  socket.to(data.roomId).emit('answer', { offer: data.offer });
});
socket.on("ice-candidate", (data) => {
  socket.to(data.roomId).emit("ice-candidate", { candidate: data.candidate });
});
}
module.exports = { handleSocketConnection };