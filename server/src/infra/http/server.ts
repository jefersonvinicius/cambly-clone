import app from '@app/main/app';
import http from 'http';

export const httpServer = http.createServer(app);
