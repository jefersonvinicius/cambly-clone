import { TeacherConnectToBeChosenUseCase } from '@app/core/use-cases/TeacherConnectToBeChoose';
import { TeacherViewModel } from '@app/infra/http/view-models/TeacherViewModel';
import { Socket } from 'socket.io';
import { SocketEvent } from '.';
import { EventsLabels } from '..';

type Params = { teacherId: string };

export class ConnectTeacherToBeChosenEvent implements SocketEvent<Params> {
  constructor(private connectTeacher: TeacherConnectToBeChosenUseCase) {}

  createHandler(socket: Socket) {
    return async ({ teacherId }: Params) => {
      const teacher = await this.connectTeacher.perform({ teacherId });
      const model = new TeacherViewModel(teacher);
      socket.broadcast.emit(EventsLabels.NewTeacherConnected, { teacher: model });
    };
  }
}