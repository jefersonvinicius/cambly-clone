import { BaseSocket, SocketServer } from '@app/infra/web-sockets';
import { UseCase } from '.';
import { TeacherNotFound } from '../errors';
import { TeacherRepository } from '../repositories/TeacherRepository';

type Params = {
  teacherId: string;
  teacherSocket: BaseSocket;
};

export class TeacherConnectUseCase implements UseCase<Params, void> {
  constructor(private socketServer: SocketServer, private teacherRepository: TeacherRepository) {}

  async perform(params: Params): Promise<void> {
    const teacher = await this.teacherRepository.findById(params.teacherId);
    if (!teacher) throw new TeacherNotFound(params.teacherId);
    await this.socketServer.connectTeacher(teacher, params.teacherSocket);
  }
}
