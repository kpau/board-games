import { Server } from 'socket.io';

export default function configIo(io: Server) {
  io.on('connection', (socket) => {
    const eventName = 'io';
    socket.emit(eventName, { socket: 'connected' });

    socket.on(eventName, (data) => {
      console.log('socket.io', eventName, data);
      io.emit(eventName, { socket: `msg ${data.length}` });
    });
  });

  // socket.emit -> current
  // socket.broadcast.emit -> everyone except current
  // io.broadcast -> everyone
}
