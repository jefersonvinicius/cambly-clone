import { StudentRequestLessonUseCase } from '@app/core/use-cases/StudentRequestLesson';
import { Socket } from 'socket.io';
import { SocketEvent } from '.';

export enum RequestLessonStatus {
  Requested = 'requested',
  Busy = 'busy',
}

type Params = {
  studentId: string;
  teacherId: string;
};

export class StudentRequestLessonEvent implements SocketEvent<Params> {
  constructor(private studentRequestLessonUseCase: StudentRequestLessonUseCase) {}

  createHandler(socket: Socket) {
    return async (params: Params, callback?: Function) => {
      await this.studentRequestLessonUseCase.perform(params);
      callback?.(RequestLessonStatus.Requested);
    };
  }
}
