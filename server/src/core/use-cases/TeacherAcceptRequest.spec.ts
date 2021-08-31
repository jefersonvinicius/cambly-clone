import { createFakeStudent, createFakeTeacher } from '@tests/helpers';
import { FakeSocketServer } from '@tests/SocketServerFake';
import RequestLesson from '../entities/RequestLesson';
import { RequestLessonNotFound } from '../errors';
import { TeacherAcceptRequestUseCase } from './TeacherAcceptRequest';

describe('TeacherAcceptRequest', () => {
  it('should start lesson with successfully', async () => {
    const student = await createFakeStudent();
    const teacher = await createFakeTeacher();
    const socketServer = new FakeSocketServer([teacher], [student]);
    const request = new RequestLesson({
      studentId: student.id,
      teacherId: teacher.id,
    });

    const studentStartLessonEmitterSpy = jest.spyOn(socketServer, 'emitStudentStartLesson');
    const teacherStartLessonEmitterSpy = jest.spyOn(socketServer, 'emitTeacherStartLesson');

    await socketServer.requestTeacher(request);

    const sut = new TeacherAcceptRequestUseCase(socketServer);
    await sut.perform({ requestId: request.id });
    expect(await socketServer.teacherIsBusy(teacher.id)).toBeTruthy();
    expect(studentStartLessonEmitterSpy).toHaveBeenCalled();
    expect(teacherStartLessonEmitterSpy).toHaveBeenCalled();
  });

  it('should get error RequestLessonNotFound when dont has lesson request in socket server', async () => {
    const student = await createFakeStudent();
    const teacher = await createFakeTeacher();
    const socketServer = new FakeSocketServer([teacher], [student]);

    const sut = new TeacherAcceptRequestUseCase(socketServer);
    const sutPromise = sut.perform({ requestId: 'lesson_id' });
    expect(sutPromise).rejects.toThrowError(new RequestLessonNotFound('lesson_id'));
  });
});
