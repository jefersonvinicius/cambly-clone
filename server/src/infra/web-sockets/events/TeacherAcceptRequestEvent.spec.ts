import { RepositoriesFactory } from '@app/infra/repositories/RepositoriesFactory';
import {
  createStudentClient,
  createTeacherClient,
  setupDatabaseTest,
  setupHttpServerAndSocket,
  teardownDatabaseTest,
  teardownHttpServer,
  waitForCallbacks,
} from '@tests/helpers';
import { connectStudent, connectTeacher } from '@tests/helpers/socket-events';
import { EventsLabels } from '..';

describe('TeacherAcceptRequestEvent', () => {
  beforeAll(async () => {
    await setupDatabaseTest();
    await setupHttpServerAndSocket();
  });

  afterAll(async () => {
    await teardownDatabaseTest();
    await teardownHttpServer();
  });

  it('should accept student request successfully', async () => {
    const student = await createStudentClient();
    const teacher = await createTeacherClient();

    await connectStudent(student.socket, { studentId: student.data.id });
    await connectTeacher(teacher.socket, { teacherId: teacher.data.id });

    await waitForCallbacks(2, (incrementCalls) => {
      teacher.socket.on(EventsLabels.NewStudentRequest, ({ request }) => {
        teacher.socket.emit(EventsLabels.AcceptStudentRequest, { requestId: request.id });
      });

      const requestData = { studentId: student.data.id, teacherId: teacher.data.id };
      student.socket.emit(EventsLabels.RequestTeacherLesson, requestData);

      teacher.socket.on(EventsLabels.LessonStarted, () => {
        expect(true).toBe(true);
        incrementCalls();
      });

      student.socket.on(EventsLabels.LessonStarted, () => {
        expect(true).toBe(true);
        incrementCalls();
      });
    });

    await student.destroy();
    await teacher.destroy();
  });
});
