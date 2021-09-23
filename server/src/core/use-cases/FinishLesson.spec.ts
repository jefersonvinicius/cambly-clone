import { LessonNotFound } from '../errors';
import { FinishLessonUseCase } from './FinishLesson';

describe('FinishLessonUseCase', () => {
  it('should throws the LessonNotFound when lesson not found', () => {
    const sut = new FinishLessonUseCase();
    const performPromise = sut.perform({ lessonId: 'any' });
    expect(performPromise).rejects.toThrowError(new LessonNotFound('any'));
  });
});
