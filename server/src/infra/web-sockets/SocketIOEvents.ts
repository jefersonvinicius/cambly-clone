import { Server } from 'socket.io';
import { httpServer } from '../http/server';

const io = new Server(httpServer);

export function setupSocketIO() {
  console.log('Setting socket io...');
  io.on('connection', (socket) => {
    socket.emit('test', { message: 'test' });
  });
}
