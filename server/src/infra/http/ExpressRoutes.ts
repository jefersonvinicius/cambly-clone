import LogInUseCase from '@app/core/use-cases/LogIn';
import SignUpUseCase from '@app/core/use-cases/SignUp';
import { StudentViewOnlineTeachersUseCase } from '@app/core/use-cases/StudentViewOnlineTeachers';
import { Request, Response } from 'express';
import { RepositoriesFactory } from '../repositories/RepositoriesFactory';
import { TypeORMUserRepository } from '../repositories/TypeORMUserRepository';
import { SocketServer } from '../web-sockets';
import { HttpRequest } from './HttpRequest';
import { LogInRoute } from './routes/LogInRoute';
import { SignUpRoute } from './routes/SignUpRoute';
import { StudentViewOnlineTeachersRoute } from './routes/StudentViewTeachersOnlineRoute';

export class ExpressRoutes {
  constructor(private socketServer: SocketServer) {}

  async singUp(request: Request, response: Response) {
    const userRepository = await TypeORMUserRepository.create();
    const signupUseCase = new SignUpUseCase(userRepository);
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

  async viewTeachersOnline(request: Request, response: Response) {
    console.log(request);
    const teacherRepository = await RepositoriesFactory.createTeacherRepository();
    const studentViewOnlineTeachersUseCase = new StudentViewOnlineTeachersUseCase(this.socketServer, teacherRepository);
    const studentViewOnlineTeachersRoute = new StudentViewOnlineTeachersRoute(studentViewOnlineTeachersUseCase);
    const result = await studentViewOnlineTeachersRoute.handle({});
    return response.status(result.statusCode).json(result.body);
  }
}
