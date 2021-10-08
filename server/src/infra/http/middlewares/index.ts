import { HttpRequest } from '../routes/Route';

export interface Middleware<Return> {
  handle(request: HttpRequest): Promise<Return>;
}
