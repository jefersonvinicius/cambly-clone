import { httpServer } from '@app/infra/http/server';
import { createIOServer } from '@app/infra/web-sockets';

const socketServer = createIOServer(httpServer);

export default socketServer;
