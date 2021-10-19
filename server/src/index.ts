import { Database } from './infra/database';
import { createHTTPServer } from './infra/http/server';

async function bootstrap() {
  await Database.connect();
  await createHTTPServer(3333);
}

bootstrap();
