import { UseCase } from '.';
import { TeacherIsBusy, TeacherOffline } from '../errors';

type Params = {
  teacherId: string;
  studentId: string;
};

type Return = void;

export interface SocketServer {
  hasTeacher(teacherId: string): Promise<boolean>;
  teacherIsBusy(teacherId: string): Promise<boolean>;
}

export class StudentRequestLesson implements UseCase<Params, Return> {
  constructor(private socketServer: SocketServer) {}

  async perform(params: Params): Promise<void> {
    const { studentId, teacherId } = params;

    if (!(await this.socketServer.hasTeacher(teacherId))) {
      throw new TeacherOffline(teacherId);
    }

    if (await this.socketServer.teacherIsBusy(teacherId)) {
      throw new TeacherIsBusy(teacherId);
    }
  }
}
