import { UseCase } from '.';
import { TeacherOffline } from '../errors';

type Params = {
  teacherId: string;
  studentId: string;
};

type Return = void;

export interface SocketServer {
  hasTeacher(teacherId: string): Promise<boolean>;
}

export class StudentRequestLesson implements UseCase<Params, void> {
  constructor(private socketServer: SocketServer) {}

  async perform(params: Params): Promise<void> {
    const { studentId, teacherId } = params;

    if (!(await this.socketServer.hasTeacher(teacherId))) {
      throw new TeacherOffline(teacherId);
    }
  }
}
