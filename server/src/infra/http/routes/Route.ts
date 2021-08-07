export interface Route {
  handle(httpRequest: HttpRequest): Promise<HttpResponse>;
}

export class HttpRequest<Body = any> {
  constructor(public body?: Body) {}
}

export type HttpResponse<Body = any> = {
  statusCode: number;
  body?: Body;
};
