import { BaseSocket, SocketServer } from '@app/infra/web-sockets';
import { UseCase } from '.';
import Teacher from '../entities/Teacher';
import { TeacherNotFound } from '../errors';
import { TeacherRepository } from '../repositories/TeacherRepository';

type Params = {
  teacherId: string;
  teacherSocket: BaseSocket;
};

type Return = Teacher;

export class TeacherConnectToBeChosenUseCase implements UseCase<Params, Return> {
  constructor(private socketServer: SocketServer, private teacherRepository: TeacherRepository) {}

  async perform(params: Params): Promise<Return> {
    const teacher = await this.teacherRepository.findById(params.teacherId);
    if (!teacher) throw new TeacherNotFound(params.teacherId);
    await this.socketServer.connectTeacher(teacher, params.teacherSocket);
    return teacher;
  }
}
