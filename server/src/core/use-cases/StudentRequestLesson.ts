import { UseCase } from '.';
import { TeacherIsBusy, TeacherOffline } from '../errors';
import RequestLesson from '../entities/RequestLesson';

type Params = {
  teacherId: string;
  studentId: string;
};

type Return = RequestLesson;

export interface SocketServer {
  hasTeacher(teacherId: string): Promise<boolean>;

  teacherIsBusy(teacherId: string): Promise<boolean>;

  setTeacherAsBusy(teacherId: string): Promise<void>;

  requestTeacher(request: RequestLesson): Promise<void>;
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

    const request = new RequestLesson({
      studentId,
      teacherId,
    });

    this.socketServer.requestTeacher(request);

    return request;
  }
}
