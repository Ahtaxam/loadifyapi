const {Server} = require("socket.io")
let io;
const initializeSocket = (server) => {
  io = new Server(server);
  io.on('connection', (socket) => {
    console.log('A user connected');
    // socket.on('disconnect', () => {
    //   console.log('User disconnected');
    // });
  });
};
const getIo = () => {
  if (!io) {
    throw new Error('Socket.io not initialized!');
  }
  return io;
};


module.exports = {initializeSocket, getIo}