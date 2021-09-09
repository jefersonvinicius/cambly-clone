import { StudentOpenToLesson } from '@app/core/use-cases/StudentOpenToLesson';
import { createHTTPServer } from '@app/infra/http/server';
import { createStudentClient, waitForCallbacks } from '@tests/helpers';
import { connectStudentClient, setupStudentConnectEvent } from '@tests/helpers/socket-events';
import { StudentRepositoryInMemory } from '@tests/StudentRepositoryInMemory';
import { createIOServer, EventsLabels } from '..';
import { SocketServerIO } from '../SocketIOEvents';
import { StudentOpenToLessonEvent } from './StudentOpenToLessonEvent';

describe('StudentOpenToLessonEvent', () => {
  let stopHttpServerFn: () => Promise<void>;
  let studentRepository: StudentRepositoryInMemory;
  let socketServer: SocketServerIO;

  beforeAll(async () => {
    const { server, stopHTTPServer } = await createHTTPServer();
    stopHttpServerFn = stopHTTPServer;

    socketServer = createIOServer(server);

    studentRepository = new StudentRepositoryInMemory();

    const studentOpenToLessonUseCase = new StudentOpenToLesson(socketServer);
    const sut = new StudentOpenToLessonEvent(studentOpenToLessonUseCase);
    socketServer.io.on('connection', (socket) => {
      setupStudentConnectEvent(socket, socketServer, studentRepository);
      socket.on(EventsLabels.StudentOpenToLesson, sut.createHandler(socket));
    });
  });

  afterAll(async () => {
    await stopHttpServerFn();
  });

  it('student should be available after open to lesson', async () => {
    const student = await createStudentClient({ id: 'any' });
    await studentRepository.insert(student.data);
    await connectStudentClient(student.socket, { studentId: student.data.id });

    await waitForCallbacks(1, (incrementsCalls) => {
      const eventPayload = { studentId: student.data.id };
      student.socket.emit(EventsLabels.StudentOpenToLesson, eventPayload, () => {
        expect(socketServer.studentsAvailable).toContainEqual(expect.objectContaining({ id: 'any' }));
        incrementsCalls();
      });
    });
  });
});
