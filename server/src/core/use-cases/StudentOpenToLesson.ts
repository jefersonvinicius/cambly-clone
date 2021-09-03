import { SocketServer } from '@app/infra/web-sockets';
import { UseCase } from '.';
import { StudentOffline } from '../errors';

type Params = {
  studentId: string;
};

export class StudentOpenToLesson implements UseCase<Params, void> {
  constructor(private socketServer: SocketServer) {}

  async perform(params: Params): Promise<void> {
    if (!(await this.socketServer.hasStudent(params.studentId))) throw new StudentOffline(params.studentId);
    this.socketServer.openStudentToLesson(params.studentId);
  }
}
