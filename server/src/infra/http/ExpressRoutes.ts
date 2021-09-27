import LogInUseCase from '@app/core/use-cases/LogIn';
import SignUp from '@app/core/use-cases/SignUp';
import { StudentViewOnlineTeachersUseCase } from '@app/core/use-cases/StudentViewOnlineTeachers';
import { Request, Response } from 'express';
import { RepositoriesFactory } from '../repositories/RepositoriesFactory';
import { TypeORMUserRepository } from '../repositories/TypeORMUserRepository';
import { SocketServer } from '../web-sockets';
import { LogInRoute } from './routes/LogInRoute';
import { HttpRequest } from './routes/Route';
import { SignUpRoute } from './routes/SignUpRoute';
import { StudentViewOnlineTeachersRoute } from './routes/StudentViewTeachersOnlineRoute';

export class ExpressRoutes {
  constructor(private socketServer: SocketServer) {}

  async singUp(request: Request, response: Response) {
    const userRepository = await TypeORMUserRepository.create();
    const signupUseCase = new SignUp(userRepository);
    const signupRoute = new SignUpRoute(signupUseCase);
    const result = await signupRoute.handle(new HttpRequest(request.body));
    return response.status(result.statusCode).json(result.body);
  }

  async logIn(request: Request, response: Response) {
    const userRepository = await RepositoriesFactory.createUserRepository();
    const loginUseCase = new LogInUseCase(userRepository);
    const loginRoute = new LogInRoute(loginUseCase);
    const result = await loginRoute.handle(new HttpRequest(request.body));
    return response.status(result.statusCode).json(result.body);
  }

  viewTeachersOnline = async (request: Request, response: Response) => {
    const teacherRepository = await RepositoriesFactory.createTeacherRepository();
    const studentViewOnlineTeachersUseCase = new StudentViewOnlineTeachersUseCase(this.socketServer, teacherRepository);
    const studentViewOnlineTeachersRoute = new StudentViewOnlineTeachersRoute(studentViewOnlineTeachersUseCase);
    const result = await studentViewOnlineTeachersRoute.handle({});
    return response.status(result.statusCode).json(result.body);
  };
}
