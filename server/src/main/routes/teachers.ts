import { StudentViewOnlineTeachersUseCase } from '@app/core/use-cases/StudentViewOnlineTeachers';
import { StudentViewOnlineTeachersRoute } from '@app/infra/http/routes/StudentViewTeachersOnlineRoute';
import { RepositoriesFactory } from '@app/infra/repositories/RepositoriesFactory';
import { Router } from 'express';
import { ExpressAdapter } from '../adapters/ExpressAdapter';
import { ExpressMiddlewares } from '../middlewares/ExpressMiddlewares';
import socketServer from '../socket-server';

const teacherRoutes = Router();

const teacherRepository = RepositoriesFactory.createTeacherRepositorySync();
const studentViewOnlineTeachersUseCase = new StudentViewOnlineTeachersUseCase(socketServer, teacherRepository);
const studentViewOnlineTeachersRoute = new StudentViewOnlineTeachersRoute(studentViewOnlineTeachersUseCase);

teacherRoutes.get(
  '/teachers/online',
  ExpressMiddlewares.checkUserJWT,
  ExpressAdapter.adaptRoute(studentViewOnlineTeachersRoute)
);

export default teacherRoutes;
