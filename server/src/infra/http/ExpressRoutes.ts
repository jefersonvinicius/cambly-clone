import LogInUseCase from '@app/core/use-cases/LogIn';
import SignUp from '@app/core/use-cases/SignUp';
import { StudentViewOnlineTeachersUseCase } from '@app/core/use-cases/StudentViewOnlineTeachers';
import { createFakeTeacher } from '@tests/helpers';
import { FakeSocketServer } from '@tests/SocketServerFake';
import { Request, Response } from 'express';
import { Database } from '../database';
import { RepositoriesFactory } from '../repositories/RepositoriesFactory';
import { TypeORMTeacherRepository } from '../repositories/TypeORMTeacherRepository';
import { TypeORMUserRepository } from '../repositories/TypeORMUserRepository';
import { LogInRoute } from './routes/LogInRoute';
import { HttpRequest } from './routes/Route';
import { SignUpRoute } from './routes/SignUpRoute';
import { StudentViewOnlineTeachersRoute } from './routes/StudentViewTeachersOnlineRoute';
import { SocketServer } from '../web-sockets';

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

  async viewTeachersOnline(request: Request, response: Response) {
    const teacherRepository = await RepositoriesFactory.createTeacherRepository();
    const studentViewOnlineTeachersUseCase = new StudentViewOnlineTeachersUseCase(this.socketServer, teacherRepository);
    const studentViewOnlineTeachersRoute = new StudentViewOnlineTeachersRoute(studentViewOnlineTeachersUseCase);
    const result = await studentViewOnlineTeachersRoute.handle({});
    return response.status(result.statusCode).json(result.body);
  }
}
