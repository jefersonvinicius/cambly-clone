import { UseCase } from '.';

type Params = {
  lessonId: string;
};

export class FinishLessonUseCase implements UseCase<Params, void> {
  perform(params: Params): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
