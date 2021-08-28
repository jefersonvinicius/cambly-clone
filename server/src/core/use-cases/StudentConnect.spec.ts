import { createFakeStudent, createFakeUser } from '@tests/helpers';
import { FakeSocket, FakeSocketServer } from '@tests/SocketServerFake';
import { StudentRepositoryInMemory } from '@tests/StudentRepositoryInMemory';
import { StudentNotFound } from '../errors';
import { StudentConnectUseCase } from './StudentConnect';

describe('StudentConnect suite tests', () => {
  it('Should student connect successfully', async () => {
    const student = await createFakeStudent({ id: 'any_student_id' });
    const socketServer = new FakeSocketServer([]);
    const studentRepository = new StudentRepositoryInMemory();
    await studentRepository.insert(student);
    const sut = new StudentConnectUseCase(socketServer, studentRepository);
    await sut.perform({ studentId: student.id, studentSocket: new FakeSocket('any') });
    expect(await socketServer.hasStudent(student.id)).toBeTruthy();
  });

  it('Should throw StudentNotFound error', async () => {
    const socketServer = new FakeSocketServer([]);
    const studentRepository = new StudentRepositoryInMemory();
    const sut = new StudentConnectUseCase(socketServer, studentRepository);
    const sutPromise = sut.perform({ studentId: 'any_student_id', studentSocket: new FakeSocket('any') });
    await expect(sutPromise).rejects.toThrowError(new StudentNotFound('any_student_id'));
  });
});
