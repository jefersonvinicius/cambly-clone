import { BaseSocket, SocketServer } from '@app/infra/web-sockets';
import { createFakeTeacher } from '@tests/helpers';
import { FakeSocket, FakeSocketServer } from '@tests/SocketServerFake';
import { TeacherRepositoryInMemory } from '@tests/TeacherRepositoryInMemory';
import RequestLesson from '../entities/RequestLesson';
import Student from '../entities/Student';
import Teacher from '../entities/Teacher';
import { TeacherRepository } from '../repositories/TeacherRepository';
import { StudentViewOnlineTeachersUseCase } from './StudentViewOnlineTeachers';

describe('StudentViewOnlineTeachersUseCase suite test', () => {
  it('Should use web sockets server to get teachers online', async () => {
    const { sut, socketServer } = createSut();
    const teachersAvailableSpy = jest.spyOn(socketServer, 'teachersAvailable', 'get');

    await sut.perform({});

    expect(teachersAvailableSpy).toHaveBeenCalled();
  });

  it('Should return teachers online', async () => {
    const { sut, socketServer } = createSut();

    const teachers = [await createFakeTeacher({ id: 'teacher1' }), await createFakeTeacher({ id: 'teacher2' })];
    await socketServer.connectTeacher(teachers[0], new FakeSocket('any'));
    await socketServer.connectTeacher(teachers[1], new FakeSocket('any'));
    await socketServer.openTeacherToLesson(teachers[0].id);
    await socketServer.openTeacherToLesson(teachers[1].id);

    const teachersOnline = await sut.perform({});
    expect(teachersOnline.length).toBe(2);
    expect(teachersOnline).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 'teacher1',
        }),
        expect.objectContaining({
          id: 'teacher2',
        }),
      ])
    );
  });

  it('Should return teachers online and not busy', async () => {
    const { sut, socketServer } = createSut();
    const teachers = [
      await createFakeTeacher({ id: 'teacher1', busy: true }),
      await createFakeTeacher({ id: 'teacher2' }),
    ];
    await socketServer.connectTeacher(teachers[0], new FakeSocket('any'));
    await socketServer.connectTeacher(teachers[1], new FakeSocket('any'));
    await socketServer.openTeacherToLesson(teachers[0].id);
    await socketServer.openTeacherToLesson(teachers[1].id);

    const teachersOnline = await sut.perform({});

    expect(teachersOnline.length).toBe(1);
    expect(teachersOnline).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 'teacher2',
          busy: false,
        }),
      ])
    );
  });
});

function createSut() {
  const socketServer = new FakeSocketServer();
  const teacherRepository = new TeacherRepositoryInMemory();
  const sut = new StudentViewOnlineTeachersUseCase(socketServer, teacherRepository);
  return { sut, teacherRepository, socketServer };
}
