import { JWT } from '@app/shared/JWT';
import { AccessTokenInvalid } from '../errors';
import { checkAccessToken } from './check-access-token';

describe('checkAccessToken', () => {
  it('should throw AccessTokenInvalid error when the token provided isn"t user token', () => {
    const token = JWT.create({ invalid: 'any' });
    expect(() => {
      checkAccessToken(token);
    }).toThrow(new AccessTokenInvalid(token));
  });

  it('should get access token decoded', () => {
    const token = JWT.create({ userId: 'any' });
    const decoded = checkAccessToken(token);
    expect(decoded).toMatchObject({
      userId: 'any',
    });
  });
});
