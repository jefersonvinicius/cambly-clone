import { Clock } from '@app/shared/Clock';
import { UseCase } from '.';
import Lesson from '../entities/Lesson';
import { LessonNotFound } from '../errors';
import { LessonRepository } from '../repositories/LessonRepository';

type Params = {
  lessonId: string;
};

export class FinishLessonUseCase implements UseCase<Params, Lesson> {
  constructor(private lessonRepository: LessonRepository) {}

  async perform(params: Params): Promise<Lesson> {
    const lesson = await this.lessonRepository.findById(params.lessonId);
    if (!lesson) throw new LessonNotFound(params.lessonId);

    lesson.endedAt = Clock.today();
    await this.lessonRepository.save(lesson);

    return lesson;
  }
}
