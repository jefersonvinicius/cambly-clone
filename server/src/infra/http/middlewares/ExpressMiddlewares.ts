import { NextFunction, Request, Response } from 'express';
import { getStatusCodeOf } from '../helpers';
import { HttpRequest } from '../HttpRequest';
import { CheckAccessTokenMiddleware } from './CheckAccessToken';

export class ExpressMiddlewares {
  static async checkUserJWT(request: Request, response: Response, next: NextFunction) {
    const checkAccessToken = new CheckAccessTokenMiddleware();
    try {
      const decoded = await checkAccessToken.handle(HttpRequest.ofExpress(request));
      console.log(decoded);
      next();
    } catch (error: any) {
      response.status(getStatusCodeOf(error)).json({
        message: error?.message,
      });
    }
  }
}
