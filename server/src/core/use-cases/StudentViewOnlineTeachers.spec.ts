import { BaseSocket, SocketServer } from '@app/infra/web-sockets';
import { createFakeTeacher } from '@tests/helpers';
import { FakeSocketServer } from '@tests/SocketServerFake';
import { TeacherRepositoryInMemory } from '@tests/TeacherRepositoryInMemory';
import RequestLesson from '../entities/RequestLesson';
import Student from '../entities/Student';
import Teacher from '../entities/Teacher';
import { TeacherRepository } from '../repositories/TeacherRepository';
import { StudentViewOnlineTeachersUseCase } from './StudentViewOnlineTeachers';

describe('StudentViewOnlineTeachersUseCase suite test', () => {
  it('Should use web sockets server to get teachers online', async () => {
    const socketServerToVerifyMethodCall = new SocketServerToVerifyMethodCall();
    const teacherRepositoryInMemory = new TeacherRepositoryInMemory();
    const sut = new StudentViewOnlineTeachersUseCase(socketServerToVerifyMethodCall, teacherRepositoryInMemory);
    await sut.perform({});
    expect(socketServerToVerifyMethodCall.calledTeachersIdsMethods).toBe(true);
  });

  it('Should use TeacherRepository to fetch teacher data by id', async () => {
    const teachers = [await createFakeTeacher({ id: 'teacher1' })];
    const socketServer = new FakeSocketServer(teachers);
    const teacherRepository = new TeacherRepositoryChecker();
    const sut = new StudentViewOnlineTeachersUseCase(socketServer, teacherRepository);
    await sut.perform({});
    expect(teacherRepository.teacherIdToFind).toBe('teacher1');
  });

  it('Should return teachers online', async () => {
    const teachers = [await createFakeTeacher({ id: 'teacher1' }), await createFakeTeacher({ id: 'teacher2' })];
    const socketServer = new FakeSocketServer(teachers);
    const teacherRepository = new TeacherRepositoryInMemory();
    await teacherRepository.insert(teachers[0]);
    await teacherRepository.insert(teachers[1]);

    const sut = new StudentViewOnlineTeachersUseCase(socketServer, teacherRepository);

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
    const teachers = [
      await createFakeTeacher({ id: 'teacher1', busy: true }),
      await createFakeTeacher({ id: 'teacher2' }),
    ];
    const socketServer = new FakeSocketServer(teachers);
    const teacherRepository = new TeacherRepositoryInMemory();
    await teacherRepository.insert(teachers[0]);
    await teacherRepository.insert(teachers[1]);

    const sut = new StudentViewOnlineTeachersUseCase(socketServer, teacherRepository);

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

class TeacherRepositoryChecker implements TeacherRepository {
  deleteById(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  teacherIdToFind: string | null = null;

  async findById(id: string): Promise<Teacher | null> {
    this.teacherIdToFind = id;
    return null;
  }

  insert(teacher: Teacher): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

class SocketServerToVerifyMethodCall implements SocketServer {
  hasStudent(studentId: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  setTeacherBusyStatus(teacherId: string, status: boolean): Promise<void> {
    throw new Error('Method not implemented.');
  }
  connectStudent(student: Student, studentSocket: BaseSocket): Promise<void> {
    throw new Error('Method not implemented.');
  }
  emitStudentStartLesson(studentId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  emitTeacherStartLesson(teacherId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  socket(teacherIdOrUserId: string): BaseSocket {
    throw new Error('Method not implemented.');
  }
  getLessonRequest(requestId: string): Promise<RequestLesson | null> {
    throw new Error('Method not implemented.');
  }
  calledTeachersIdsMethods = false;

  async teachersIdsNotBusy(): Promise<string[]> {
    this.calledTeachersIdsMethods = true;
    return [];
  }

  hasTeacher(teacherId: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  teacherIsBusy(teacherId: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  setTeacherAsBusy(teacherId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  requestTeacher(request: RequestLesson): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async teachersIds(): Promise<string[]> {
    throw new Error('Method not implemented.');
  }

  connectTeacher(teacher: Teacher): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
