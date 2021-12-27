import { AccessTokenData } from '@app/core/use-cases/LogIn';
import { JWT } from '@app/shared/JWT';
import { Middleware } from '.';
import { AccessTokenInvalid, AccessTokenNotProvided } from '../errors';
import { HttpRequest } from '../HttpRequest';

export class CheckAccessTokenMiddleware implements Middleware<AccessTokenData> {
  async handle(request: HttpRequest<any>): Promise<AccessTokenData> {
    const decoded = JWT.decode<any>(tokenOfHeader());
    validateToken();

    return decoded;

    function tokenOfHeader() {
      const header = String(request.headers?.['authorization']);

      const spaceIdx = header.indexOf(' ');
      if (!header.startsWith('Bearer') || spaceIdx === -1) throw new AccessTokenNotProvided();

      return header.substring(spaceIdx).trim();
    }

    function validateToken() {
      if (!decoded?.userId) throw new AccessTokenInvalid();
    }
  }
}
