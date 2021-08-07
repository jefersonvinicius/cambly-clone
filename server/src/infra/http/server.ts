import express from 'express';
import { Database } from '../database';
import { ExpressRoutes } from './ExpressRoutes';

const app = express();

app.use(express.json());
app.post('/signup', ExpressRoutes.singUp);
app.post('/login', ExpressRoutes.logIn);

async function bootstrap() {
  await Database.connect();
  app.listen(3333, () => {
    console.log('Serving on http://localhost:3333');
  });
}

bootstrap();
