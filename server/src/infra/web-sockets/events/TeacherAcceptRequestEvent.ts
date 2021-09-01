import { TeacherAcceptRequestUseCase } from '@app/core/use-cases/TeacherAcceptRequest';
import { Socket } from 'socket.io';
import { SocketEvent } from '.';

type Params = {
  requestId: string;
};

export class TeacherAcceptRequestEvent implements SocketEvent<Params> {
  constructor(private teacherAcceptRequestUseCase: TeacherAcceptRequestUseCase) {}

  createHandler(socket: Socket) {
    return async (params: Params, callback?: Function) => {
      await this.teacherAcceptRequestUseCase.perform({
        requestId: params.requestId,
      });
    };
  }
}
