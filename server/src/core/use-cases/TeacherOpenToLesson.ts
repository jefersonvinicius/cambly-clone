import { SocketServer } from '@app/infra/web-sockets';
import { UseCase } from '.';
import { StudentOffline, TeacherOffline } from '../errors';

type Params = {
  teacherId: string;
};

export class TeacherOpenToLessonUseCase implements UseCase<Params, void> {
  constructor(private socketServer: SocketServer) {}

  async perform(params: Params): Promise<void> {
    if (!(await this.socketServer.hasTeacher(params.teacherId))) throw new TeacherOffline(params.teacherId);
    await this.socketServer.openTeacherToLesson(params.teacherId);
    await this.socketServer.emitNewTeacherAvailableEvent(params.teacherId);
  }
}
