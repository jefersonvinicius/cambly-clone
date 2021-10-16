import { HttpRequest } from '../HttpRequest';

export interface Route {
  handle(httpRequest: HttpRequest): Promise<HttpResponse>;
}

export type HttpResponse<Body = any> = {
  statusCode: number;
  body?: Body;
};
