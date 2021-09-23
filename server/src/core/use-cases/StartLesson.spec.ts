import { createFakeStudent, createFakeTeacher } from '@tests/helpers';
import { LessonRepositoryInMemory } from '@tests/LessonRepositoryInMemory';
import { FakeSocket, FakeSocketServer } from '@tests/SocketServerFake';
import { StudentOffline, StudentUnavailable, TeacherOffline, TeacherUnavailable } from '../errors';
import { StartLessonUseCase } from './StartLesson';

describe('TeacherStartLesson suite tests', () => {
  const dummySocket = new FakeSocket('any');

  it('should TeacherStartLesson class is defined correctly', () => {
    expect(StartLessonUseCase).toBeDefined();
  });

  it('should get error TeacherOffline when teacher is offline', () => {
    const teacherId = 'offline_teacher_id';
    const { sut } = createSut();
    const performPromise = sut.perform({ teacherId, studentId: 'any' });
    expect(performPromise).rejects.toThrowError(new TeacherOffline(teacherId));
  });

  it('should get error TeacherUnavailable when teacher is`nt open to lesson', async () => {
    const { sut, socketServer } = createSut();
    const teacher = await createFakeTeacher();
    await socketServer.connectTeacher(teacher, dummySocket);
    const performPromise = sut.perform({ teacherId: teacher.id, studentId: 'any' });
    expect(performPromise).rejects.toThrowError(new TeacherUnavailable(teacher.id));
  });

  it('should get error StudentOffline when student is offline', async () => {
    const { sut, socketServer } = createSut();
    const teacher = await createFakeTeacher();
    await socketServer.connectTeacher(teacher, dummySocket);
    await socketServer.openTeacherToLesson(teacher.id);

    const studentId = 'offline_student_id';
    const performPromise = sut.perform({ studentId, teacherId: teacher.id });
    expect(performPromise).rejects.toThrowError(new StudentOffline(studentId));
  });

  it('should get error StudentUnavailable when student isn`t open to lesson', async () => {
    const { sut, socketServer } = createSut();
    const teacher = await createFakeTeacher();
    await socketServer.connectTeacher(teacher, dummySocket);
    await socketServer.openTeacherToLesson(teacher.id);
    const student = await createFakeStudent();
    await socketServer.connectStudent(student, dummySocket);

    const performPromise = sut.perform({ studentId: student.id, teacherId: teacher.id });

    expect(performPromise).rejects.toThrowError(new StudentUnavailable(student.id));
  });

  it('should teacher change to busy and get unavailable after start lesson', async () => {
    const { sut, socketServer } = createSut();
    const teacher = await createFakeTeacher();
    await socketServer.connectTeacher(teacher, dummySocket);
    await socketServer.openTeacherToLesson(teacher.id);

    const student = await createFakeStudent();
    await socketServer.connectStudent(student, dummySocket);
    await socketServer.openStudentToLesson(student.id);

    await sut.perform({ studentId: student.id, teacherId: teacher.id });

    expect(await socketServer.teacherIsAvailable(teacher.id)).toBe(false);
    expect(await socketServer.teacherIsBusy(teacher.id)).toBe(true);
  });

  it('should student get unavailable after start lesson', async () => {
    const { sut, socketServer } = createSut();
    const teacher = await createFakeTeacher();
    await socketServer.connectTeacher(teacher, dummySocket);
    await socketServer.openTeacherToLesson(teacher.id);

    const student = await createFakeStudent();
    await socketServer.connectStudent(student, dummySocket);
    await socketServer.openStudentToLesson(student.id);

    await sut.perform({ studentId: student.id, teacherId: teacher.id });

    expect(await socketServer.studentIsAvailable(student.id)).toBe(false);
  });

  it('should emit event NewLessonStarted to teacher and student', async () => {
    const { sut, socketServer } = createSut();
    const teacher = await createFakeTeacher();
    await socketServer.connectTeacher(teacher, dummySocket);
    await socketServer.openTeacherToLesson(teacher.id);

    const student = await createFakeStudent();
    await socketServer.connectStudent(student, dummySocket);
    await socketServer.openStudentToLesson(student.id);

    const emitNewLessonStartedLessonSpy = jest.spyOn(socketServer, 'emitNewLessonStartedEvent');

    const lesson = await sut.perform({ studentId: student.id, teacherId: teacher.id });

    expect(emitNewLessonStartedLessonSpy).toBeCalledWith(lesson);
  });

  it('should save lesson on repository', async () => {
    const { sut, socketServer, lessonRepository } = createSut();
    const teacher = await createFakeTeacher();
    await socketServer.connectTeacher(teacher, dummySocket);
    await socketServer.openTeacherToLesson(teacher.id);

    const student = await createFakeStudent();
    await socketServer.connectStudent(student, dummySocket);
    await socketServer.openStudentToLesson(student.id);

    const lesson = await sut.perform({ studentId: student.id, teacherId: teacher.id });

    expect(await lessonRepository.findById(lesson.id)).toMatchObject(lesson);
  });
});

function createSut() {
  const socketServer = new FakeSocketServer();
  const lessonRepository = new LessonRepositoryInMemory();
  const sut = new StartLessonUseCase(socketServer, lessonRepository);
  return { sut, socketServer, lessonRepository };
}
