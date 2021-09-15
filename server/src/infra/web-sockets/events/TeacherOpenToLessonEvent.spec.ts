import { TeacherOpenToLessonUseCase } from '@app/core/use-cases/TeacherOpenToLesson';
import { createHTTPServer } from '@app/infra/http/server';
import { createTeacherClient, waitForCallbacks } from '@tests/helpers';
import { connectTeacherClient, setupTeacherConnectEvent } from '@tests/helpers/socket-events';
import { TeacherRepositoryInMemory } from '@tests/TeacherRepositoryInMemory';
import { createIOServer, EventsLabels } from '..';
import { SocketServerIO } from '../SocketIOEvents';
import { TeacherOpenToLessonEvent } from './TeacherOpenToLessonEvent';

describe('StudentOpenToLessonEvent', () => {
  let stopHttpServerFn: () => Promise<void>;
  let teacherRepository: TeacherRepositoryInMemory;
  let socketServer: SocketServerIO;

  beforeAll(async () => {
    const { server, stopHTTPServer } = await createHTTPServer();
    stopHttpServerFn = stopHTTPServer;

    socketServer = createIOServer(server);

    teacherRepository = new TeacherRepositoryInMemory();

    const teacherOpenToLessonUseCase = new TeacherOpenToLessonUseCase(socketServer);
    const sut = new TeacherOpenToLessonEvent(teacherOpenToLessonUseCase);
    socketServer.io.on('connection', (socket) => {
      setupTeacherConnectEvent(socket, socketServer, teacherRepository);
      socket.on(EventsLabels.TeacherOpenToLesson, sut.createHandler(socket));
    });
  });

  afterAll(async () => {
    await stopHttpServerFn();
  });

  it('student should be available after open to lesson', async () => {
    const teacher = await createTeacherClient({ id: 'any' });
    await teacherRepository.insert(teacher.data);
    await connectTeacherClient(teacher.socket, { teacherId: teacher.data.id });

    await waitForCallbacks(1, (incrementsCalls) => {
      const eventPayload = { teacherId: teacher.data.id };
      teacher.socket.emit(EventsLabels.TeacherOpenToLesson, eventPayload, () => {
        expect(socketServer.teachersAvailable).toContainEqual(expect.objectContaining({ id: 'any' }));
        incrementsCalls();
      });
    });
  });
});
