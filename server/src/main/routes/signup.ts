import SignUpUseCase from '@app/core/use-cases/SignUp';
import { SignUpRoute } from '@app/infra/http/routes/SignUpRoute';
import { RepositoriesFactory } from '@app/infra/repositories/RepositoriesFactory';
import { Router } from 'express';
import { ExpressAdapter } from '../adapters/ExpressAdapter';

const signupRoutes = Router();

const userRepository = RepositoriesFactory.createUserRepositorySync();
const signupUseCase = new SignUpUseCase(userRepository);
const signupRoute = new SignUpRoute(signupUseCase);

signupRoutes.post('/signup', ExpressAdapter.adaptRoute(signupRoute));

export default signupRoutes;
