import { TeacherConnectUseCase } from '@app/core/use-cases/TeacherConnect';
import { TeacherOpenToLessonUseCase } from '@app/core/use-cases/TeacherOpenToLesson';
import { httpServer } from '@app/infra/http/server';
import { RepositoriesFactory } from '@app/infra/repositories/RepositoriesFactory';
import { createIOServer, EventsLabels } from '@app/infra/web-sockets';
import { ConnectTeacherEvent } from '@app/infra/web-sockets/events/ConnectTeacherEvent';
import { TeacherOpenToLessonEvent } from '@app/infra/web-sockets/events/TeacherOpenToLessonEvent';

const socketServer = createIOServer(httpServer);

export function initializeSocketServer() {
  const teacherRepository = RepositoriesFactory.createTeacherRepositorySync();
  const connectTeacherUseCase = new TeacherConnectUseCase(socketServer, teacherRepository);
  const connectTeacherEvent = new ConnectTeacherEvent(connectTeacherUseCase);

  const teacherOpenToLessonUseCase = new TeacherOpenToLessonUseCase(socketServer);
  const teacherOpenToLesson = new TeacherOpenToLessonEvent(teacherOpenToLessonUseCase);

  socketServer.io.on('connection', (socket) => {
    socket.on(EventsLabels.ConnectTeacher, connectTeacherEvent.createHandler(socket));
    socket.on(EventsLabels.TeacherOpenToLesson, teacherOpenToLesson.createHandler(socket));
  });
}

export default socketServer;
