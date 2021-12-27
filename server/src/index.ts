import { Database } from './infra/database';
import { httpServer } from './infra/http/server';
import { initializeApp } from './main/app';
import { initializeSocketServer } from './main/socket-server';

async function bootstrap() {
  await Database.connect();

  initializeSocketServer();
  await initializeApp();

  httpServer.listen(3333, () => {
    console.log('Serving on http://localhost:3333');
  });
}

bootstrap();
