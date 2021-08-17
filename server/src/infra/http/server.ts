import express from 'express';
import { ExpressRoutes } from './ExpressRoutes';
import http from 'http';

const app = express();

app.use(express.json());
app.post('/signup', ExpressRoutes.singUp);
app.post('/login', ExpressRoutes.logIn);
app.get('/teachers/online', ExpressRoutes.viewTeachersOnline);

export const httpServer = http.createServer(app);

export function startHttpServer() {
  return new Promise<void>((resolve) => {
    httpServer.listen(3333, () => {
      console.log('Serving on http://localhost:3333');
      resolve();
    });
  });
}

export function stopHttpServer() {
  httpServer.close();
}
