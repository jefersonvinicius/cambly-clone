import { Clock } from '@app/shared/Clock';
import { createFakeLesson, createFakeTeacher } from '@tests/helpers';
import { LessonRepositoryInMemory } from '@tests/LessonRepositoryInMemory';
import { FakeSocket, FakeSocketServer } from '@tests/SocketServerFake';
import { LessonNotFound } from '../errors';
import { FinishLessonUseCase } from './FinishLesson';

describe('FinishLessonUseCase', () => {
  it('should throws the LessonNotFound error when the lesson not found', () => {
    const { sut } = createSut();
    const performPromise = sut.perform({ lessonId: 'any' });
    expect(performPromise).rejects.toThrowError(new LessonNotFound('any'));
  });

  it('should save the end time of lesson', async () => {
    const { sut, lessonRepository } = createSut();
    const lesson = await createFakeLesson({ id: 'any' });
    await lessonRepository.insert(lesson.clone());

    jest.spyOn(Clock, 'today').mockImplementation(() => new Date('2021-09-23T19:43:08'));
    const lessonUpdated = await sut.perform({ lessonId: 'any' });
    expect(lessonUpdated.endedAt).toEqual(new Date('2021-09-23T19:43:08'));
    expect((await lessonRepository.findById('any'))?.endedAt).toEqual(new Date('2021-09-23T19:43:08'));
  });

  it('should to change the teacher status to not busy', async () => {
    const { sut, lessonRepository, socketServer } = createSut();
    const lesson = await createFakeLesson({ id: 'any', teacherId: 'teacherId' });
    await lessonRepository.insert(lesson.clone());
    await socketServer.connectTeacher(await createFakeTeacher({ id: 'teacherId' }), new FakeSocket('any'));
    await socketServer.setTeacherBusyStatus('teacherId', true);

    await sut.perform({ lessonId: 'any' });

    expect(await socketServer.teacherIsBusy('teacherId')).toBe(false);
  });
});

function createSut() {
  const socketServer = new FakeSocketServer();
  const lessonRepository = new LessonRepositoryInMemory();
  const sut = new FinishLessonUseCase(socketServer, lessonRepository);
  return { sut, lessonRepository, socketServer };
}
