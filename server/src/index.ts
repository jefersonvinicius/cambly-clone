import { Database } from './infra/database';

async function bootstrap() {
  await Database.connect();

  const { httpServer } = await import('./infra/http/server');
  httpServer.listen(3333, () => {
    console.log('Serving on http://localhost:3333');
  });
}

bootstrap();
