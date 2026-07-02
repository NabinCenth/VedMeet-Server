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
}
module.exports = { handleSocketConnection };