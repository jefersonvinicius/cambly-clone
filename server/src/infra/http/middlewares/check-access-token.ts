import { JWT } from '@app/shared/JWT';
import { AccessTokenInvalid } from '../errors';

export function checkAccessToken(token: string): { accessToken: string } {
  const decoded = JWT.decode<any>(token);
  if (!decoded.userId) throw new AccessTokenInvalid(token);

  return decoded;
}
