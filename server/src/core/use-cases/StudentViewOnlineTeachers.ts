import { SocketServer } from '@app/infra/web-sockets';
import { UseCase } from '.';
import Teacher from '../entities/Teacher';
import { TeacherRepository } from '../repositories/TeacherRepository';

export class StudentViewOnlineTeachersUseCase implements UseCase<{}, Teacher[]> {
  constructor(private socketServer: SocketServer, private teacherRepository: TeacherRepository) {}

  async perform(params: {}): Promise<Teacher[]> {
    console.log(this.socketServer.teachersAvailable);
    return this.socketServer.teachersAvailable.filter((teacher) => !teacher.isBusy);
  }
}
