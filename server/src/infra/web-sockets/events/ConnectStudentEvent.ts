import { TeacherConnectToBeChosenUseCase } from '@app/core/use-cases/TeacherConnectToBeChoose';
import { TeacherViewModel } from '@app/infra/http/view-models/TeacherViewModel';
import { Socket } from 'socket.io';
import { SocketEvent } from '.';
import { StudentConnectUseCase } from '@app/core/use-cases/StudentConnect';
import { EventsLabels } from '..';
import SocketServer from '../SocketServer';

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
