import { Server } from 'socket.io';
import { httpServer } from '../http/server';

export function setupSocketIO() {
  const io = new Server(httpServer);
  io.on('connection', (socket) => {
    socket.emit('ping');
  });
}
