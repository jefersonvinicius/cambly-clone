import { StartLessonUseCase } from '@app/core/use-cases/StartLesson';
import { Socket } from 'socket.io';
import { SocketEvent } from '.';

type Params = {
  studentId: string;
  teacherId: string;
};

export class StartLessonEvent implements SocketEvent<Params> {
  constructor(private startLessonUseCase: StartLessonUseCase) {}

  createHandler(socket: Socket) {
    return async (params: Params, callback?: Function) => {
      await this.startLessonUseCase.perform(params);
    };
  }
}
