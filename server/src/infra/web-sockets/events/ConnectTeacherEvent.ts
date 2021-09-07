import { StudentConnectUseCase } from '@app/core/use-cases/StudentConnect';
import { Socket } from 'socket.io';
import { SocketEvent } from '.';

type Params = { studentId: string };

export class ConnectTeacherEvent implements SocketEvent<Params> {
  constructor(private connectTeacherUseCase: ) {}

  createHandler(socket: Socket) {
    
  }
}
