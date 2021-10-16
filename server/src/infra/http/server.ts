import express, { Router } from 'express';
import http from 'http';
import cors from 'cors';
import { createIOServer } from '../web-sockets';
import { ExpressRoutes } from './ExpressRoutes';
import { ExpressMiddlewares } from './middlewares/ExpressMiddlewares';

const app = express();

export const httpServer = http.createServer(app);
const socketServer = createIOServer(httpServer);
const routes = new ExpressRoutes(socketServer);

const requiredAuthRoutes = Router();
requiredAuthRoutes.use(ExpressMiddlewares.checkUserJWT);

app.use(cors());
app.use(express.json());
app.post('/signup', routes.singUp);
app.post('/login', routes.logIn);
requiredAuthRoutes.get('/teachers/online', routes.viewTeachersOnline.bind(routes));

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
