import { stopHttpServer } from '@app/infra/http/server';
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
import { RequestLessonStatus } from './StudentRequestLessonEvent';

describe('StudentRequestLessonEvent suite tests', () => {
  beforeAll(async () => {
    await setupDatabaseTest();
    await setupHttpServerAndSocket();
  });

  afterAll(async () => {
    await teardownDatabaseTest();
    await teardownHttpServer();
  });

  it('Should request lesson successfully', async () => {
    const student = await createStudentClient({ id: 'any_student_id' });
    const teacher = await createTeacherClient({ id: 'any_teacher_id' });

    await connectTeacher(teacher.socket, { teacherId: teacher.data.id });
    await connectStudent(student.socket, { studentId: student.data.id });

    const data = { teacherId: 'any_teacher_id', studentId: 'any_student_id' };

    await waitForCallbacks(2, (incrementCalls) => {
      teacher.socket.on(EventsLabels.NewStudentRequest, async ({ student, request }) => {
        expect(student).toMatchObject(student);
        expect(request).toEqual(
          expect.objectContaining({ id: expect.any(String), teacherId: 'any_teacher_id', studentId: 'any_student_id' })
        );
        await teacher.destroy();
        incrementCalls();
      });

      student.socket.emit(EventsLabels.RequestTeacherLesson, data, async (response: RequestLessonStatus) => {
        expect(response).toBe(RequestLessonStatus.Requested);
        await student.destroy();
        incrementCalls();
      });
    });
  });
});
