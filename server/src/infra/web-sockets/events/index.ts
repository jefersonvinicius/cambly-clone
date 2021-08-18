import { Socket } from 'socket.io';

export interface SocketEvent<Params = undefined> {
  createHandler(socket: Socket): (params: Params) => void;
}
