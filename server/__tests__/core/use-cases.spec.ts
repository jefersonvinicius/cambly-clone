import { TeacherOffline } from '@app/core/errors';
import { SocketServer, StudentRequestLesson } from '@app/core/use-cases/StudentRequestLesson';

describe('Use cases suite tests', () => {
  it('Student not must be able request teacher lesson when teacher is not online', async () => {
    const studentRequestLessonUseCase = new StudentRequestLesson(new FakeSocketServer());
    const performPromise = studentRequestLessonUseCase.perform({ studentId: 'student_id', teacherId: 'teacher3' });
    await expect(performPromise).rejects.toThrowError(TeacherOffline);
  });
  it('Student not must be able request teacher lesson when teacher is in another lesson', () => {});
  it.todo('Student must be able request teacher lesson');
});

class FakeSocketServer implements SocketServer {
  private teachersIdsAvailable = ['teacher1', 'teacher2'];

  async hasTeacher(teacherId: string): Promise<boolean> {
    return this.teachersIdsAvailable.includes(teacherId);
  }
}
