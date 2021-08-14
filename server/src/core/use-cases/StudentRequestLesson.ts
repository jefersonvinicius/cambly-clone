import { UseCase } from '.';
import { TeacherIsBusy, TeacherOffline } from '@app/core/errors';
import RequestLesson from '@app/core/entities/RequestLesson';
import { SocketServer } from '@app/infra/web-sockets';

type Params = {
  teacherId: string;
  studentId: string;
};

type Return = RequestLesson;

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
