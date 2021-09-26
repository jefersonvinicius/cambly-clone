import { FinishLessonUseCase } from '@app/core/use-cases/FinishLesson';
import { getStatusCodeOf } from '../helpers';
import { HttpRequest, HttpResponse, Route } from './Route';

export class FinishLessonRoute implements Route {
  constructor(private finishLessonRouteUseCase: FinishLessonUseCase) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.finishLessonRouteUseCase.perform({ lessonId: httpRequest.body.lessonId });
      return { statusCode: 200 };
    } catch (error: any) {
      return { statusCode: getStatusCodeOf(error), body: { message: error?.message } };
    }
  }
}
