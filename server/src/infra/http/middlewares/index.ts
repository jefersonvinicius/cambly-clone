import { HttpRequest } from '../HttpRequest';

export interface Middleware<Return> {
  handle(request: HttpRequest): Promise<Return>;
}
