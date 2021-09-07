import { StudentConnectUseCase } from '@app/core/use-cases/StudentConnect';
import { Socket } from 'socket.io';
import { SocketEvent } from '.';

type Params = { studentId: string };

export class ConnectStudentEvent implements SocketEvent<Params> {
  constructor(private studentConnectUseCase: StudentConnectUseCase) {}

  createHandler(socket: Socket) {
    return async (params: Params, callback?: Function) => {
      await this.studentConnectUseCase.perform({
        studentId: params.studentId,
        studentSocket: socket,
      });
      callback?.();
    };
  }
}
