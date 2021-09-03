import { BaseSocket } from '@app/infra/web-sockets';
import { createFakeStudent } from '@tests/helpers';
import { FakeSocketServer } from '@tests/SocketServerFake';
import { StudentOffline } from '../errors';
import { StudentOpenToLesson } from './StudentOpenToLesson';

describe('StudentOpenToLesson', () => {
  let dummySocket: BaseSocket;

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
    await socketServer.connectStudent(await createFakeStudent({ id: 'any_student_id' }), dummySocket);

    const openStudentToLessonSpy = jest.spyOn(socketServer, 'openStudentToLesson');
    await sut.perform({ studentId: 'any_student_id' });
    expect(openStudentToLessonSpy).toHaveBeenCalledTimes(1);
    expect(openStudentToLessonSpy).toHaveBeenCalledWith('any_student_id');
  });

  it('Should student available after call openStudentToLesson method', async () => {
    const { sut, socketServer } = createSut();
    await socketServer.connectStudent(await createFakeStudent({ id: 'any_student_id' }), dummySocket);

    await sut.perform({ studentId: 'any_student_id' });
    expect(await socketServer.availableStudents()).toContainEqual(
      expect.objectContaining({
        any_student_id: expect.any(Object),
      })
    );
  });
  it.todo('Should emit event to teacher about new student available');
  it.todo('Should dispatch event to teachers after student open to lesson');
});

function createSut() {
  const socketServer = new FakeSocketServer();
  const sut = new StudentOpenToLesson(socketServer);
  return { sut, socketServer };
}
