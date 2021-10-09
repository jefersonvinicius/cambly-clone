import { JWT } from '@app/shared/JWT';
import { AccessTokenInvalid, AccessTokenNotProvided } from '../errors';
import { HttpRequest } from '../routes/Route';
import { CheckAccessTokenMiddleware } from './CheckAccessToken';

describe('CheckAccessToken', () => {
  it('should throw AccessTokenNotProvided when the token isn"t provided', async () => {
    const sut = new CheckAccessTokenMiddleware();
    const request = new HttpRequest({
      headers: {},
    });
    const promise = sut.handle(request);
    await expect(promise).rejects.toThrow(new AccessTokenNotProvided());
  });

  it('should throw AccessTokenNotProvided when the Authorization header is invalid', async () => {
    const sut = new CheckAccessTokenMiddleware();
    const request = new HttpRequest({
      headers: {
        Authorization: 'invalid_token',
      },
    });
    const promise = sut.handle(request);
    await expect(promise).rejects.toThrow(new AccessTokenNotProvided());
  });

  it('should throw AccessTokenInvalid when the decoded token is invalid', async () => {
    const sut = new CheckAccessTokenMiddleware();
    const request = new HttpRequest({
      headers: {
        Authorization: `Bearer ${JWT.create({ invalid: 'any' })}`,
      },
    });
    const promise = sut.handle(request);
    await expect(promise).rejects.toThrow(new AccessTokenInvalid());
  });

  it('should return access token data when it is valid', async () => {
    const sut = new CheckAccessTokenMiddleware();
    const request = new HttpRequest({
      headers: {
        Authorization: `Bearer ${JWT.create({ userId: 'any' })}`,
      },
    });
    const data = await sut.handle(request);

    expect(data).toMatchObject({
      userId: 'any',
    });
  });
});
