import { BaseSocket } from '@app/infra/web-sockets';
import { createFakeTeacher } from '@tests/helpers';
import { FakeSocketServer } from '@tests/SocketServerFake';
import { TeacherRepositoryInMemory } from '@tests/TeacherRepositoryInMemory';
import { TeacherNotFound } from '../errors';
import { TeacherConnectToBeChosenUseCase } from './TeacherConnectToBeChoose';

describe('TeacherConnectToBeChosenUseCase suite tests', () => {
  let baseSocket: BaseSocket;
  beforeAll(() => {
    baseSocket = { id: 'any' };
  });

  it('Should be able connect successfully', async () => {
    const { sut, socketServer, teacherRepository } = createSut();
    await teacherRepository.insert(await createFakeTeacher({ id: 'any_teacher_id' }));

    await sut.perform({ teacherId: 'any_teacher_id', teacherSocket: baseSocket });

    expect(await socketServer.hasTeacher('any_teacher_id')).toBe(true);
  });

  it('Should throw TeacherNotFoundError if teacher not exists', () => {
    const { sut } = createSut();

    const promise = sut.perform({ teacherId: 'any_teacher_id', teacherSocket: baseSocket });

    expect(promise).rejects.toThrow(new TeacherNotFound('any_teacher_id'));
  });
});

function createSut() {
  const socketServer = new FakeSocketServer([]);
  const teacherRepository = new TeacherRepositoryInMemory();

  const sut = new TeacherConnectToBeChosenUseCase(socketServer, teacherRepository);
  return { sut, teacherRepository, socketServer };
}
