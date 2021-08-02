import Teacher from '@app/core/entities/Teacher';
import { TeacherIsBusy, TeacherOffline } from '@app/core/errors';
import { SocketServer, StudentRequestLesson } from '@app/core/use-cases/StudentRequestLesson';
import { createFakeTeacher } from '@tests/_helpers';

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
    const lesson = await studentRequestLessonUseCase.perform({
      studentId: 'student_id',
      teacherId: 'teacher-1',
    });

    expect(lesson.studentId).toBe('student_id');
    expect(lesson.teacherId).toBe('teacher-1');
    expect(lesson.code).toHaveLength(7);
    expect(await fakeSocketServer.teacherIsBusy('teacher-1')).toBeTruthy();
  });
});

class FakeSocketServer implements SocketServer {
  constructor(private teachers: Teacher[]) {}

  async hasTeacher(teacherId: string): Promise<boolean> {
    return this.teachers.map((t) => t.id).includes(teacherId);
  }

  async teacherIsBusy(teacherId: string): Promise<boolean> {
    return this.teachers.find((t) => t.id === teacherId)?.isBusy ?? false;
  }

  async setTeacherAsBusy(teacherId: string) {
    this.teachers = this.teachers.map((t) => {
      if (t.id === teacherId) {
        t.setBusy(true);
        return t;
      }
      return t;
    });
  }
}
