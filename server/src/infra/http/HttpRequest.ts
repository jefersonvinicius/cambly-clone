export class HttpRequest<Body = any> {
  public body?: Body;
  public headers?: any;

  constructor(data: { body?: Body; headers?: any }) {
    this.body = data.body;
    this.headers = data.headers;
  }
}
