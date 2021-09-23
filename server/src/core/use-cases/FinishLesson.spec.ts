import { Clock } from '@app/shared/Clock';
import { createFakeLesson } from '@tests/helpers';
import { LessonRepositoryInMemory } from '@tests/LessonRepositoryInMemory';
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
});

function createSut() {
  const lessonRepository = new LessonRepositoryInMemory();
  const sut = new FinishLessonUseCase(lessonRepository);
  return { sut, lessonRepository };
}
