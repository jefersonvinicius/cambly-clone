import { FakeSocketServer } from '@tests/SocketServerFake';
import { StudentOffline } from '../errors';
import { StudentOpenToLesson } from './StudentOpenToLesson';

describe('StudentOpenToLesson', () => {
  it('Should get error StudentOffline when student not exists in socket server', async () => {
    const socketServer = new FakeSocketServer();
    const sut = new StudentOpenToLesson(socketServer);
    const performPromise = sut.perform({ studentId: 'any_student_id' });
    expect(performPromise).rejects.toThrowError(new StudentOffline('any_student_id'));
  });
  it.todo('Should dispatch event to teachers after student open to lesson');
});
