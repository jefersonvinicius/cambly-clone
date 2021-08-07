import LogIn from '@app/core/use-cases/LogIn';
import SignUp from '@app/core/use-cases/SignUp';
import { Request, Response } from 'express';
import { PostgreSQLUserRepository } from '../repositories/PostgreSQLUserRepository';
import { LogInRoute } from './routes/LogInRoute';
import { HttpRequest } from './routes/Route';
import { SignUpRoute } from './routes/SignUpRoute';

export class ExpressRoutes {
  static async singUp(request: Request, response: Response) {
    const userRepository = await PostgreSQLUserRepository.create();
    const signupUseCase = new SignUp(userRepository);
    const signupRoute = new SignUpRoute(signupUseCase);
    const result = await signupRoute.handle(new HttpRequest(request.body));
    return response.status(result.statusCode).json(result.body);
  }

  static async logIn(request: Request, response: Response) {
    const userRepository = await PostgreSQLUserRepository.create();
    const loginUseCase = new LogIn(userRepository);
    const loginRoute = new LogInRoute(loginUseCase);
    const result = await loginRoute.handle(new HttpRequest(request.body));
    return response.status(result.statusCode).json(result.body);
  }
}
