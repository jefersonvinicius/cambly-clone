import { HttpResponseUtils } from '@app/infra/http/HttpResponse';
import { NextFunction, Request, Response } from 'express';
import { getStatusCodeOf } from '../../infra/http/helpers';
import { HttpRequest } from '../../infra/http/HttpRequest';
import { CheckAccessTokenMiddleware } from '../../infra/http/middlewares/CheckAccessToken';

export class ExpressMiddlewares {
  static async checkUserJWT(request: Request, response: Response, next: NextFunction) {
    const checkAccessToken = new CheckAccessTokenMiddleware();
    try {
      const decoded = await checkAccessToken.handle(HttpRequest.ofExpress(request));

      console.log(decoded);
      next();
    } catch (error: any) {
      const httpResponse = HttpResponseUtils.createErrorResponse(error);
      return response.status(httpResponse.statusCode).json(httpResponse.body);
    }
  }
}
