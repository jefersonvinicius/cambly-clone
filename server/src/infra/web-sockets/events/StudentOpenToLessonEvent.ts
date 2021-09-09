import { StudentOpenToLesson } from '@app/core/use-cases/StudentOpenToLesson';
import { Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { SocketEvent } from '.';

type Params = {
  studentId: string;
};

export class StudentOpenToLessonEvent implements SocketEvent<Params> {
  constructor(private studentOpenToLessonUseCase: StudentOpenToLesson) {}

  createHandler(socket: Socket) {
    return async (params: Params, callback?: Function) => {
      await this.studentOpenToLessonUseCase.perform({ studentId: params.studentId });
      callback?.();
    };
  }
}
