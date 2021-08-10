import Teacher from '@app/core/entities/Teacher';
import { TeacherIsBusy, TeacherOffline } from '@app/core/errors';
import { StudentRequestLesson } from './StudentRequestLesson';
import { createFakeTeacher } from '@tests/helpers';
import { FakeSocketServer } from '@tests/SocketServerFake';

describe('Use cases suite tests', () => {
  let teachers: Teacher[] = [];
  let fakeSocketServer: FakeSocketServer;

  beforeAll(async () => {
    teachers.push(await createFakeTeacher({ id: 'teacher-1' }));
    teachers.push(await createFakeTeacher({ id: 'teacher-2' }));
    teachers.push(await createFakeTeacher({ id: 'busy-teacher-1', busy: true }));
    fakeSocketServer = new FakeSocketServer(teachers);
  });

  it('Student not must be able request teacher lesson when teacher is not online', async () => {
    const studentRequestLessonUseCase = new StudentRequestLesson(fakeSocketServer);
    const performPromise = studentRequestLessonUseCase.perform({
      studentId: 'student_id',
      teacherId: 'teacher-that-not-exists',
    });
    await expect(performPromise).rejects.toThrowError(TeacherOffline);
  });

  it('Student not must be able request teacher lesson when teacher is in another lesson', async () => {
    const studentRequestLessonUseCase = new StudentRequestLesson(fakeSocketServer);
    const performPromise = studentRequestLessonUseCase.perform({
      studentId: 'student_id',
      teacherId: 'busy-teacher-1',
    });
    await expect(performPromise).rejects.toThrowError(TeacherIsBusy);
  });

  it('Student must be able request teacher lesson successfully', async () => {
    const studentRequestLessonUseCase = new StudentRequestLesson(fakeSocketServer);
    const request = await studentRequestLessonUseCase.perform({
      studentId: 'student_id',
      teacherId: 'teacher-1',
    });

    expect(request.studentId).toBe('student_id');
    expect(request.teacherId).toBe('teacher-1');
    expect(await fakeSocketServer.hasRequest(request.id)).toBeTruthy();
  });
});
