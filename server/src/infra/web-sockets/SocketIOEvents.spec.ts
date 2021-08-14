import { startHttpServer, stopHttpServer } from '../http/server';

import { io } from 'socket.io-client';
import { setupSocketIO } from './SocketIOEvents';

describe('SocketIOEvents', () => {
  beforeAll(async () => {
    await startHttpServer();
    setupSocketIO();
  });

  afterAll(async () => {
    stopHttpServer();
  });

  it('Should be able connect to socket server', (done) => {
    const client = io('http://localhost:3333');
    console.log(client.connected);

    client.on('test', ({ message }) => {
      expect(message).toBe('test');
      client.close();
      done();
    });

    client.connect();
  });
});
