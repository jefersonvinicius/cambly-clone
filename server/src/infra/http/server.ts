import express from 'express';
import { ExpressRoutes } from './ExpressRoutes';
import http from 'http';
import { createIOClient } from '@tests/helpers';
import { createIOServer } from '../web-sockets';

const app = express();

export const httpServer = http.createServer(app);
const socketServer = createIOServer(httpServer);
const routes = new ExpressRoutes(socketServer);

app.use(express.json());
app.post('/signup', routes.singUp);
app.post('/login', routes.logIn);
app.get('/teachers/online', routes.viewTeachersOnline);

export async function createHTTPServer() {
  const server = http.createServer(app);
  await start();

  return { server, stopHTTPServer };

  function start() {
    return new Promise<void>((resolve) => {
      server.listen(3333, () => {
        console.log('Serving on http://localhost:3333');
        resolve();
      });
    });
  }

  function stopHTTPServer() {
    return new Promise<void>((resolve) => {
      let serverClosed = false;

      server.close(() => {
        serverClosed = true;
        resolve();
      });

      setTimeout(() => {
        if (!serverClosed) resolve();
      }, 1000);
    });
  }
}

export function startHttpServer() {
  return new Promise<void>((resolve) => {
    httpServer.listen(3333, () => {
      console.log('Serving on http://localhost:3333');
      resolve();
    });
  });
}
