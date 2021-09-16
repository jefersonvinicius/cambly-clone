import { SocketServer } from '@app/infra/web-sockets';
import { UseCase } from '.';
import Lesson from '../entities/Lesson';
import { StudentOffline, StudentUnavailable, TeacherOffline, TeacherUnavailable } from '../errors';

type Params = {
  studentId: string;
  teacherId: string;
};

type Return = Lesson;

export class TeacherStartLessonUseCase implements UseCase<Params, Lesson> {
  constructor(private socketServer: SocketServer) {}

  async perform(params: Params): Promise<Lesson> {
    if (!(await this.socketServer.hasTeacher(params.teacherId))) throw new TeacherOffline(params.teacherId);
    if (!(await this.socketServer.teacherIsAvailable(params.teacherId))) throw new TeacherUnavailable(params.teacherId);
    if (!(await this.socketServer.hasStudent(params.studentId))) throw new StudentOffline(params.studentId);
    if (!(await this.socketServer.studentIsAvailable(params.studentId))) throw new StudentUnavailable(params.studentId);

    await this.socketServer.removeTeacherFromAvailable(params.teacherId);
    await this.socketServer.setTeacherBusyStatus(params.teacherId, true);
    await this.socketServer.removeStudentFromAvailable(params.studentId);

    return new Lesson(params);
  }
}
