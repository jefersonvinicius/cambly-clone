import { Request } from 'express';

export class HttpRequest<Body = any> {
  public body?: Body;
  public headers?: any;

  constructor(data: { body?: Body; headers?: any }) {
    this.body = data.body;
    this.headers = data.headers;
  }

  static ofExpress(request: Request) {
    return new HttpRequest({
      body: request.body,
      headers: request.headers,
    });
  }
}
