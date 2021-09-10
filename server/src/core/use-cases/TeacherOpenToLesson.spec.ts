import { BaseSocket } from '@app/infra/web-sockets';
import { createFakeTeacher } from '@tests/helpers';
import { FakeSocketServer } from '@tests/SocketServerFake';
import Teacher from '../entities/Teacher';
import { TeacherOffline } from '../errors';
import { TeacherOpenToLessonUseCase } from './TeacherOpenToLesson';

describe('TeacherOpenToLesson', () => {
  let dummySocket: BaseSocket;
  let teacher: Teacher;

  beforeAll(async () => {
    teacher = await createFakeTeacher({ id: 'any_teacher_id' });
  });

  beforeEach(() => {
    dummySocket = { id: 'any' };
  });

  it('Should get error TeacherOffline when teacher not exists in socket server', async () => {
    const socketServer = new FakeSocketServer();
    const sut = new TeacherOpenToLessonUseCase(socketServer);
    const performPromise = sut.perform({ teacherId: 'any_teacher_id' });
    expect(performPromise).rejects.toThrowError(new TeacherOffline('any_teacher_id'));
  });

  it('should call openTeacherToLesson method', async () => {
    const { sut, socketServer } = createSut();
    await socketServer.connectTeacher(teacher, dummySocket);

    const openTeacherToLessonSpy = jest.spyOn(socketServer, 'openTeacherToLesson');
    await sut.perform({ teacherId: 'any_teacher_id' });
    expect(openTeacherToLessonSpy).toHaveBeenCalledTimes(1);
    expect(openTeacherToLessonSpy).toHaveBeenCalledWith('any_teacher_id');
  });

  it('Should teacher available after call openTeacherToLesson method', async () => {
    const { sut, socketServer } = createSut();
    await socketServer.connectTeacher(teacher, dummySocket);

    await sut.perform({ teacherId: 'any_teacher_id' });
    expect(await socketServer.availableTeachers()).toContainEqual(
      expect.objectContaining({
        any_teacher_id: expect.any(Object),
      })
    );
  });
  it('Should emit event to student about new teacher available', async () => {
    const { sut, socketServer } = createSut();
    await socketServer.connectTeacher(teacher, dummySocket);

    const emitNewTeacherAvailableEventSpy = jest.spyOn(socketServer, 'emitNewTeacherAvailableEvent');
    await sut.perform({ teacherId: teacher.id });
    expect(emitNewTeacherAvailableEventSpy).toHaveBeenCalledTimes(1);
    expect(emitNewTeacherAvailableEventSpy).toHaveBeenCalledWith(teacher.id);
  });
});

function createSut() {
  const socketServer = new FakeSocketServer();
  const sut = new TeacherOpenToLessonUseCase(socketServer);
  return { sut, socketServer };
}
