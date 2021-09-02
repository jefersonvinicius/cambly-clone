import { setupHttpServerAndSocket, teardownHttpServer } from '@tests/helpers';
import { io } from 'socket.io-client';

describe('SocketIOEvents', () => {
  beforeAll(async () => {
    await setupHttpServerAndSocket();
  });

  afterAll(async () => {
    await teardownHttpServer();
  });

  it('Should be able connect to socket server', (done) => {
    const client = io('http://localhost:3333');

    client.on('ping', () => {
      expect(true).toBe(true);
      client.close();
      done();
    });

    client.connect();
  });
});
