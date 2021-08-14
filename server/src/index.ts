import { Database } from './infra/database';
import { startHttpServer } from './infra/http/server';

async function bootstrap() {
  await Database.connect();
  await startHttpServer();
}

bootstrap();
