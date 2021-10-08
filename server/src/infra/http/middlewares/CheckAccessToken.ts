import { AccessTokenData } from '@app/core/use-cases/LogIn';
import { JWT } from '@app/shared/JWT';
import { Middleware } from '.';
import { AccessTokenInvalid, AccessTokenNotProvided } from '../errors';
import { HttpRequest } from '../routes/Route';

// export function checkAccessToken(token: string): { accessToken: string } {
//   const decoded = JWT.decode<any>(token);
//   if (!decoded.userId) throw new AccessTokenInvalid(token);

//   return decoded;
// }

export class CheckAccessTokenMiddleware implements Middleware<AccessTokenData> {
  async handle(request: HttpRequest<any>): Promise<AccessTokenData> {
    const token = tokenOfHeader();

    function tokenOfHeader() {
      const header = request.headers?.['Authorization'] ? String(request.headers?.['Authorization']) : null;
      if (!header) throw new AccessTokenNotProvided();

      const spacePos = header.indexOf(' ');
      if (spacePos === -1) throw new AccessTokenNotProvided();

      // return header.substring(spacePos).trim();
    }
  }
}
