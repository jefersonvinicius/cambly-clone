import { NextFunction, Request, Response } from 'express';

export class ExpressMiddlewares {
  static async checkUserJWT(request: Request, response: Response, next: NextFunction) {}
}
