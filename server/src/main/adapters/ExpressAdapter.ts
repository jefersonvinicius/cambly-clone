import { HttpRequest } from '@app/infra/http/HttpRequest';
import { Route } from '@app/infra/http/routes/Route';
import { Request, Response } from 'express';

export class ExpressAdapter {
  static adaptRoute(route: Route) {
    return async (req: Request, res: Response) => {
      const response = await route.handle(HttpRequest.ofExpress(req));
      return res.status(response.statusCode).json(response.body);
    };
  }
}
