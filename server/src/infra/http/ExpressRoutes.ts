import LogInUseCase from '@app/core/use-cases/LogIn';
import SignUp from '@app/core/use-cases/SignUp';
import { StudentViewOnlineTeachersUseCase } from '@app/core/use-cases/StudentViewOnlineTeachers';
import { createFakeTeacher } from '@tests/helpers';
import { FakeSocketServer } from '@tests/SocketServerFake';
import { TeacherRepositoryInMemory } from '@tests/TeacherRepositoryInMemory';
import { Request, Response } from 'express';
import { Database } from '../database';
import { TypeORMTeacherRepository } from '../repositories/TypeORMTeacherRepository';
import { TypeORMUserRepository } from '../repositories/TypeORMUserRepository';
import { LogInRoute } from './routes/LogInRoute';
import { HttpRequest } from './routes/Route';
import { SignUpRoute } from './routes/SignUpRoute';
import { StudentViewOnlineTeachersRoute } from './routes/StudentViewTeachersOnlineRoute';

export class ExpressRoutes {
  static async singUp(request: Request, response: Response) {
    const userRepository = await TypeORMUserRepository.create();
    const signupUseCase = new SignUp(userRepository);
    const signupRoute = new SignUpRoute(signupUseCase);
    const result = await signupRoute.handle(new HttpRequest(request.body));
    return response.status(result.statusCode).json(result.body);
  }

  static async logIn(request: Request, response: Response) {
    const userRepository = await TypeORMUserRepository.create();
    const loginUseCase = new LogInUseCase(userRepository);
    const loginRoute = new LogInRoute(loginUseCase);
    const result = await loginRoute.handle(new HttpRequest(request.body));
    return response.status(result.statusCode).json(result.body);
  }

  static async viewTeachersOnline(request: Request, response: Response) {
    const teacher1 = await createFakeTeacher();
    const teacher2 = await createFakeTeacher();
    const socketServer = new FakeSocketServer([teacher1, teacher2]);
    const connection = await Database.getInstance();
    const teacherRepository = new TypeORMTeacherRepository(connection);
    const studentViewOnlineTeachersUseCase = new StudentViewOnlineTeachersUseCase(socketServer, teacherRepository);
    const studentViewOnlineTeachersRoute = new StudentViewOnlineTeachersRoute(studentViewOnlineTeachersUseCase);
    const result = await studentViewOnlineTeachersRoute.handle({});
    return response.status(result.statusCode).json(result.body);
  }
}
