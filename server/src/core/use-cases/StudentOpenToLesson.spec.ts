import { BaseSocket } from '@app/infra/web-sockets';
import { createFakeStudent } from '@tests/helpers';
import { FakeSocketServer } from '@tests/SocketServerFake';
import Student from '../entities/Student';
import { StudentOffline } from '../errors';
import { StudentOpenToLesson } from './StudentOpenToLesson';

describe('StudentOpenToLesson', () => {
  let dummySocket: BaseSocket;
  let student: Student;

  beforeAll(async () => {
    student = await createFakeStudent({ id: 'any_student_id' });
  });

  beforeEach(() => {
    dummySocket = { id: 'any' };
  });

  it('Should get error StudentOffline when student not exists in socket server', async () => {
    const socketServer = new FakeSocketServer();
    const sut = new StudentOpenToLesson(socketServer);
    const performPromise = sut.perform({ studentId: 'any_student_id' });
    expect(performPromise).rejects.toThrowError(new StudentOffline('any_student_id'));
  });

  it('should call openStudentToLesson method', async () => {
    const { sut, socketServer } = createSut();
    await socketServer.connectStudent(student, dummySocket);

    const openStudentToLessonSpy = jest.spyOn(socketServer, 'openStudentToLesson');
    await sut.perform({ studentId: 'any_student_id' });
    expect(openStudentToLessonSpy).toHaveBeenCalledTimes(1);
    expect(openStudentToLessonSpy).toHaveBeenCalledWith('any_student_id');
  });

  it('Should student available after call openStudentToLesson method', async () => {
    const { sut, socketServer } = createSut();
    await socketServer.connectStudent(student, dummySocket);

    await sut.perform({ studentId: 'any_student_id' });
    expect(await socketServer.availableStudents()).toContainEqual(
      expect.objectContaining({
        any_student_id: expect.any(Object),
      })
    );
  });
  it('Should emit event to teacher about new student available', async () => {
    const { sut, socketServer } = createSut();
    await socketServer.connectStudent(student, dummySocket);

    const emitNewStudentAvailableEventSpy = jest.spyOn(socketServer, 'emitNewStudentAvailableEvent');
    await sut.perform({ studentId: student.id });
    expect(emitNewStudentAvailableEventSpy).toHaveBeenCalledTimes(1);
    expect(emitNewStudentAvailableEventSpy).toHaveBeenCalledWith(student.id);
  });
  it.todo('Should dispatch event to teachers after student open to lesson');
});

function createSut() {
  const socketServer = new FakeSocketServer();
  const sut = new StudentOpenToLesson(socketServer);
  return { sut, socketServer };
}
