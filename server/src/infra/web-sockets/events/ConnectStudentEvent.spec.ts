import { StudentConnectUseCase } from '@app/core/use-cases/StudentConnect';
import { createHTTPServer } from '@app/infra/http/server';
import {
  createStudentClient,
  setupDatabaseTest,
  setupHttpServerAndSocket,
  teardownDatabaseTest,
  teardownHttpServer,
  waitForCallbacks,
} from '@tests/helpers';
import { connectStudent } from '@tests/helpers/socket-events';
import { StudentRepositoryInMemory } from '@tests/StudentRepositoryInMemory';
import { createIOServer, EventsLabels } from '..';
import { ConnectStudentEvent } from './ConnectStudentEvent';

describe('ConnectStudentEvent suite test', () => {
  let stopHttpServerFn: Function;
  let studentRepository: StudentRepositoryInMemory;

  beforeAll(async () => {
    const { server, stopHTTPServer } = await createHTTPServer();
    stopHttpServerFn = stopHTTPServer;

    const socketServer = createIOServer(server);

    studentRepository = new StudentRepositoryInMemory();
    const connectStudentUseCase = new StudentConnectUseCase(socketServer, studentRepository);
    const connectStudentEvent = new ConnectStudentEvent(connectStudentUseCase);
    socketServer.io.on('connection', (socket) => {
      socket.on(EventsLabels.ConnectStudent, connectStudentEvent.createHandler(socket));
    });
  });

  afterAll(async () => {
    await stopHttpServerFn();
  });

  it('Should connect student successfully', async () => {
    const student = await createStudentClient();
    await studentRepository.insert(student.data);

    await waitForCallbacks(1, (incrementCalls) => {
      connectStudent(student.socket, { studentId: student.data.id }, async () => {
        expect(true).toBe(true);
        await student.destroy();
        await studentRepository.deleteById(student.data.id);
        incrementCalls();
      });
    });
  });
});
