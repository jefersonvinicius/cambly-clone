import { TeacherOpenToLessonUseCase } from '@app/core/use-cases/TeacherOpenToLesson';
import { Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { SocketEvent } from '.';

type Params = {
  teacherId: string;
};

export class TeacherOpenToLessonEvent implements SocketEvent<Params> {
  constructor(private teacherOpenToLessonUseCase: TeacherOpenToLessonUseCase) {}

  createHandler(socket: Socket) {
    return async (params: Params, callback?: Function) => {
      await this.teacherOpenToLessonUseCase.perform({ teacherId: params.teacherId });
      callback?.();
    };
  }
}
