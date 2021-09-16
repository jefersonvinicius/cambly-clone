import { StartLessonUseCase } from '@app/core/use-cases/StartLesson';
import { createHTTPServer } from '@app/infra/http/server';
import { createStudentClient, createTeacherClient, waitForCallbacks } from '@tests/helpers';
import {
  connectStudentClient,
  connectTeacherClient,
  openStudentToLesson,
  openTeacherToLesson,
  setupStudentConnectEvent,
  setupStudentOpenToLessonEvent,
  setupTeacherConnectEvent,
  setupTeacherOpenToLessonEvent,
} from '@tests/helpers/socket-events';
import { StudentRepositoryInMemory } from '@tests/StudentRepositoryInMemory';
import { TeacherRepositoryInMemory } from '@tests/TeacherRepositoryInMemory';
import { createIOServer, EventsLabels } from '..';
import { SocketServerIO } from '../SocketIOEvents';
import { StartLessonEvent } from './StartLessonEvent';

describe('StartLessonEvent suite tests', () => {
  let stopHttpServerFn: () => Promise<void>;
  let studentRepository: StudentRepositoryInMemory;
  let socketServer: SocketServerIO;
  let teacherRepository: TeacherRepositoryInMemory;

  beforeAll(async () => {
    const { server, stopHTTPServer } = await createHTTPServer();
    stopHttpServerFn = stopHTTPServer;

    socketServer = createIOServer(server);

    studentRepository = new StudentRepositoryInMemory();
    teacherRepository = new TeacherRepositoryInMemory();

    const startLessonUseCase = new StartLessonUseCase(socketServer);
    const sut = new StartLessonEvent(startLessonUseCase);
    socketServer.io.on('connection', (socket) => {
      setupStudentConnectEvent(socket, socketServer, studentRepository);
      setupStudentOpenToLessonEvent(socket, socketServer);
      setupTeacherConnectEvent(socket, socketServer, teacherRepository);
      setupTeacherOpenToLessonEvent(socket, socketServer);
      socket.on(EventsLabels.StartLesson, sut.createHandler(socket));
    });
  });

  afterAll(async () => {
    await stopHttpServerFn();
  });

  it('should StartLessonEvent exists', () => {
    expect(StartLessonEvent).toBeDefined();
  });

  it('should teacher and student client receive the new lesson started', async () => {
    const student = await createStudentClient();
    const teacher = await createTeacherClient();

    await studentRepository.insert(student.data);
    await teacherRepository.insert(teacher.data);

    await connectStudentClient(student.socket, { studentId: student.data.id });
    await connectTeacherClient(teacher.socket, { teacherId: teacher.data.id });
    await openStudentToLesson(student.socket, { studentId: student.data.id });
    await openTeacherToLesson(teacher.socket, { teacherId: teacher.data.id });

    expect(await socketServer.hasStudent(student.data.id)).toBe(true);
    expect(await socketServer.hasTeacher(teacher.data.id)).toBe(true);
    expect(await socketServer.studentIsAvailable(student.data.id)).toBe(true);
    expect(await socketServer.teacherIsAvailable(teacher.data.id)).toBe(true);
    expect(await socketServer.teacherIsBusy(teacher.data.id)).toBe(false);

    const payload = { studentId: student.data.id, teacherId: teacher.data.id };
    student.socket.emit(EventsLabels.StartLesson, payload);

    await waitForCallbacks(2, (incrementCalls) => {
      teacher.socket.on(EventsLabels.NewLessonStarted, async ({ lesson }) => {
        expect(lesson).toMatchObject({
          studentId: student.data.id,
          teacherId: teacher.data.id,
        });
        incrementCalls();
      });

      student.socket.on(EventsLabels.NewLessonStarted, async ({ lesson }) => {
        expect(lesson).toMatchObject({
          studentId: student.data.id,
          teacherId: teacher.data.id,
        });
        incrementCalls();
      });
    });

    expect(await socketServer.studentIsAvailable(student.data.id)).toBe(false);
    expect(await socketServer.teacherIsAvailable(teacher.data.id)).toBe(false);
    expect(await socketServer.teacherIsBusy(teacher.data.id)).toBe(true);

    await student.destroy();
    await student.destroy();
  });
});
