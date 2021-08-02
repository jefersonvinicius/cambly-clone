import { UseCase } from '.';
import Lesson from '@app/core/entities/Lesson';
import { TeacherIsBusy, TeacherOffline } from '../errors';

type Params = {
  teacherId: string;
  studentId: string;
};

type Return = Lesson;

export interface SocketServer {
  hasTeacher(teacherId: string): Promise<boolean>;

  teacherIsBusy(teacherId: string): Promise<boolean>;

  setTeacherAsBusy(teacherId: string): Promise<void>;
}

export class StudentRequestLesson implements UseCase<Params, Return> {
  constructor(private socketServer: SocketServer) {}

  async perform(params: Params): Promise<Return> {
    const { studentId, teacherId } = params;

    if (!(await this.socketServer.hasTeacher(teacherId))) {
      throw new TeacherOffline(teacherId);
    }

    if (await this.socketServer.teacherIsBusy(teacherId)) {
      throw new TeacherIsBusy(teacherId);
    }

    this.socketServer.setTeacherAsBusy(teacherId);

    return new Lesson({
      studentId,
      teacherId,
    });
  }
}
