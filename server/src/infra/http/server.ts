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

app.use(cors());
app.use(express.json());
app.post('/signup', routes.singUp);
app.post('/login', routes.logIn);
app.get('/teachers/online', ExpressMiddlewares.checkUserJWT, routes.viewTeachersOnline.bind(routes));

export async function createHTTPServer(port = 3332) {
  const server = http.createServer(app);
  await start();

  return { server, stopHTTPServer };

  function start() {
    return new Promise<void>((resolve) => {
      server.listen(port, () => {
        console.log(`Serving on http://localhost:${port}`);
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
