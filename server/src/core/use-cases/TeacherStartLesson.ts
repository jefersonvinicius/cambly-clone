import { SocketServer } from '@app/infra/web-sockets';
import { UseCase } from '.';
import { StudentOffline, StudentUnavailable, TeacherOffline, TeacherUnavailable } from '../errors';

type Params = {
  studentId: string;
  teacherId: string;
};

export class TeacherStartLessonUseCase implements UseCase<Params, void> {
  constructor(private socketServer: SocketServer) {}

  async perform(params: Params): Promise<void> {
    if (!(await this.socketServer.hasTeacher(params.teacherId))) throw new TeacherOffline(params.teacherId);
    if (!(await this.socketServer.teacherIsAvailable(params.teacherId))) throw new TeacherUnavailable(params.teacherId);
    if (!(await this.socketServer.hasStudent(params.studentId))) throw new StudentOffline(params.studentId);
    if (!(await this.socketServer.studentIsAvailable(params.studentId))) throw new StudentUnavailable(params.studentId);
  }
}
