import { TeacherConnectUseCase } from '@app/core/use-cases/TeacherConnect';
import { createHTTPServer } from '@app/infra/http/server';
import { createTeacherClient, waitForCallbacks } from '@tests/helpers';
import { connectTeacherClient } from '@tests/helpers/socket-events';
import { TeacherRepositoryInMemory } from '@tests/TeacherRepositoryInMemory';
import { createIOServer, EventsLabels } from '..';
import { ConnectTeacherEvent } from './ConnectTeacherEvent';

describe('ConnectStudentEvent suite test', () => {
  let stopHttpServerFn: Function;
  let teacherRepository: TeacherRepositoryInMemory;

  beforeAll(async () => {
    const { server, stopHTTPServer } = await createHTTPServer();
    stopHttpServerFn = stopHTTPServer;

    const socketServer = createIOServer(server);

    teacherRepository = new TeacherRepositoryInMemory();
    const connectTeacherUseCase = new TeacherConnectUseCase(socketServer, teacherRepository);
    const connectTeacherEvent = new ConnectTeacherEvent(connectTeacherUseCase);
    socketServer.io.on('connection', (socket) => {
      socket.on(EventsLabels.ConnectTeacher, connectTeacherEvent.createHandler(socket));
    });
  });

  afterAll(async () => {
    await stopHttpServerFn();
  });

  it('Should connect teacher successfully', async () => {
    const teacher = await createTeacherClient();
    await teacherRepository.insert(teacher.data);

    await waitForCallbacks(1, (incrementCalls) => {
      connectTeacherClient(teacher.socket, { teacherId: teacher.data.id }, async () => {
        expect(true).toBe(true);
        await teacher.destroy();
        await teacherRepository.deleteById(teacher.data.id);
        incrementCalls();
      });
    });
  });
});
