import SignUp from '@app/core/use-cases/SignUp';
import express, { Request, Response } from 'express';
import { Database } from '../database';
import { PostgreSQLUserRepository } from '../repositories/PostgreSQLUserRepository';
import { HttpRequest } from './routes/Route';
import { SignUpRoute } from './routes/SignUpRoute';

const app = express();

class ExpressRouteAdapter {
  static async adapt(request: Request, response: Response) {
    const connection = await Database.getInstance();
    const userRepository = new PostgreSQLUserRepository(connection);
    const signupUseCase = new SignUp(userRepository);
    const signupRoute = new SignUpRoute(signupUseCase);
    const result = await signupRoute.handle(new HttpRequest(request.body));
    return response.status(result.statusCode).json(result.body);
  }
}

app.use(express.json());

app.post('/signup', ExpressRouteAdapter.adapt);

app.listen(3333, () => {
  console.log('Serving on http://localhost:3333');
});
