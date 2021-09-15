import { createFakeStudent, createFakeTeacher } from '@tests/helpers';
import { FakeSocket, FakeSocketServer } from '@tests/SocketServerFake';
import { StudentOffline, StudentUnavailable, TeacherOffline, TeacherUnavailable } from '../errors';
import { TeacherStartLessonUseCase } from './TeacherStartLesson';

describe('TeacherStartLesson suite tests', () => {
  const dummySocket = new FakeSocket('any');

  it('should TeacherStartLesson class is defined correctly', () => {
    expect(TeacherStartLessonUseCase).toBeDefined();
  });

  it('should get error TeacherOffline when teacher is offline', () => {
    const teacherId = 'offline_teacher_id';
    const { sut } = createSut();
    const performPromise = sut.perform({ teacherId, studentId: 'any' });
    expect(performPromise).rejects.toThrowError(new TeacherOffline(teacherId));
  });

  it('should get error TeacherUnavailable when teacher is`nt open to lesson', async () => {
    const { sut, socketServer } = createSut();
    const teacher = await createFakeTeacher();
    await socketServer.connectTeacher(teacher, dummySocket);
    const performPromise = sut.perform({ teacherId: teacher.id, studentId: 'any' });
    expect(performPromise).rejects.toThrowError(new TeacherUnavailable(teacher.id));
  });

  it('should get error StudentOffline when student is offline', async () => {
    const { sut, socketServer } = createSut();
    const teacher = await createFakeTeacher();
    await socketServer.connectTeacher(teacher, dummySocket);
    await socketServer.openTeacherToLesson(teacher.id);

    const studentId = 'offline_student_id';
    const performPromise = sut.perform({ studentId, teacherId: teacher.id });
    expect(performPromise).rejects.toThrowError(new StudentOffline(studentId));
  });

  it('should get error StudentUnavailable when student isn`t open to lesson', async () => {
    const { sut, socketServer } = createSut();
    const teacher = await createFakeTeacher();
    await socketServer.connectTeacher(teacher, dummySocket);
    await socketServer.openTeacherToLesson(teacher.id);
    const student = await createFakeStudent();
    await socketServer.connectStudent(student, dummySocket);

    const performPromise = sut.perform({ studentId: student.id, teacherId: teacher.id });

    expect(performPromise).rejects.toThrowError(new StudentUnavailable(student.id));
  });
});

function createSut() {
  const socketServer = new FakeSocketServer();
  const sut = new TeacherStartLessonUseCase(socketServer);
  return { sut, socketServer };
}
