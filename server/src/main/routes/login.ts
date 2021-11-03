import LogInUseCase from '@app/core/use-cases/LogIn';
import { LogInRoute } from '@app/infra/http/routes/LogInRoute';
import { RepositoriesFactory } from '@app/infra/repositories/RepositoriesFactory';
import { Router } from 'express';
import { ExpressAdapter } from '../adapters/ExpressAdapter';

const userRepository = RepositoriesFactory.createUserRepositorySync();
const loginUseCase = new LogInUseCase(userRepository);
const loginRoute = new LogInRoute(loginUseCase);

const loginRoutes = Router();
loginRoutes.post('/login', ExpressAdapter.adaptRoute(loginRoute));

export default loginRoutes;
