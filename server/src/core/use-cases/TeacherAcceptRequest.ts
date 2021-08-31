import { SocketServer } from '@app/infra/web-sockets';
import { UseCase } from '.';
import RequestLesson from '../entities/RequestLesson';
import { RequestLessonNotFound } from '../errors';

type Params = {
  requestId: string;
};

export class TeacherAcceptRequestUseCase implements UseCase<Params, void> {
  constructor(private socketServer: SocketServer) {}

  async perform(params: Params): Promise<void> {
    const lessonRequest = await this.socketServer.getLessonRequest(params.requestId);
    if (!lessonRequest) throw new RequestLessonNotFound(params.requestId);
    await this.socketServer.setTeacherBusyStatus(lessonRequest.teacherId, true);
    await this.socketServer.emitStudentStartLesson(lessonRequest.studentId);
    await this.socketServer.emitTeacherStartLesson(lessonRequest.teacherId);
  }
}
