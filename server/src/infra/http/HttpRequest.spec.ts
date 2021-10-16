import { Request } from 'express';
import { HttpRequest } from './HttpRequest';

describe('HttpRequest', () => {
  it('should create HttpRequest instance from express Request', () => {
    const expressRequest: Partial<Request> = {
      body: { any1: 1, any2: 'any' },
      headers: {
        authorization: 'Bearer any_token',
      },
    };

    const sut = HttpRequest.ofExpress(expressRequest as Request);

    expect(sut).toMatchObject({
      body: { any1: 1, any2: 'any' },
      headers: {
        authorization: 'Bearer any_token',
      },
    });
  });
});
