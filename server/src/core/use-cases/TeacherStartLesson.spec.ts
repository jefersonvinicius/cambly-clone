import { createFakeStudent } from '@tests/helpers';
import { FakeSocket, FakeSocketServer } from '@tests/SocketServerFake';
import { StudentOffline, StudentUnavailable } from '../errors';
import { TeacherStartLessonUseCase } from './TeacherStartLesson';

describe('TeacherStartLesson suite tests', () => {
  const dummySocket = new FakeSocket('any');

  it('should TeacherStartLesson class is defined correctly', () => {
    expect(TeacherStartLessonUseCase).toBeDefined();
  });

  it('should get error StudentOffline when student is offline', () => {
    const studentId = 'offline_student_id';
    const { sut } = createSut();
    const performPromise = sut.perform({ studentId });
    expect(performPromise).rejects.toThrowError(new StudentOffline(studentId));
  });

  it('should get error StudentUnavailable when student isn`t open to lesson', async () => {
    const student = await createFakeStudent();
    const { sut, socketServer } = createSut();
    await socketServer.connectStudent(student, dummySocket);
    const performPromise = sut.perform({ studentId: student.id });
    expect(performPromise).rejects.toThrowError(new StudentUnavailable(student.id));
  });
});

function createSut() {
  const socketServer = new FakeSocketServer();
  const sut = new TeacherStartLessonUseCase(socketServer);
  return { sut, socketServer };
}
