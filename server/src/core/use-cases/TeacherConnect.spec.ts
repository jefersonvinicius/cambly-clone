import { createFakeTeacher } from '@tests/helpers';
import { FakeSocket, FakeSocketServer } from '@tests/SocketServerFake';
import { TeacherRepositoryInMemory } from '@tests/TeacherRepositoryInMemory';
import { TeacherNotFound } from '../errors';
import { TeacherConnectUseCase } from './TeacherConnect';

describe('TeacherConnectUseCase suite tests', () => {
  it('Should teacher connect successfully', async () => {
    const teacher = await createFakeTeacher({ id: 'any_teacher_id' });
    const socketServer = new FakeSocketServer();
    const teacherRepository = new TeacherRepositoryInMemory();
    await teacherRepository.insert(teacher);
    const sut = new TeacherConnectUseCase(socketServer, teacherRepository);
    await sut.perform({ teacherId: teacher.id, teacherSocket: new FakeSocket('any') });
    expect(await socketServer.hasTeacher(teacher.id)).toBeTruthy();
  });

  it('Should throw TeacherNotFound error', async () => {
    const socketServer = new FakeSocketServer();
    const teacherRepository = new TeacherRepositoryInMemory();
    const sut = new TeacherConnectUseCase(socketServer, teacherRepository);
    const sutPromise = sut.perform({ teacherId: 'any_teacher_id', teacherSocket: new FakeSocket('any') });
    await expect(sutPromise).rejects.toThrowError(new TeacherNotFound('any_teacher_id'));
  });
});
