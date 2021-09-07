import { StudentConnectUseCase } from '@app/core/use-cases/StudentConnect';
import { TeacherConnectUseCase } from '@app/core/use-cases/TeacherConnect';
import { Socket } from 'socket.io';
import { SocketEvent } from '.';

type Params = { teacherId: string };

export class ConnectTeacherEvent implements SocketEvent<Params> {
  constructor(private connectTeacherUseCase: TeacherConnectUseCase) {}

  createHandler(socket: Socket) {
    return async (params: Params, callback?: Function) => {
      await this.connectTeacherUseCase.perform({ teacherId: params.teacherId, teacherSocket: socket });
      callback?.();
    };
  }
}
