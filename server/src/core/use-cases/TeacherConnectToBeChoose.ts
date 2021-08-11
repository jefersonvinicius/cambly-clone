import { SocketServer } from '@app/infra/sockets';
import { UseCase } from '.';
import Teacher from '../entities/Teacher';
import { TeacherNotFound } from '../errors';
import { TeacherRepository } from '../repositories/TeacherRepository';

type Params = {
  teacherId: string;
};

export class TeacherConnectToBeChosenUseCase implements UseCase<Params, void> {
  constructor(private socketServer: SocketServer, private teacherRepository: TeacherRepository) {}

  async perform(params: Params): Promise<void> {
    const teacher = await this.teacherRepository.findById(params.teacherId);
    if (!teacher) throw new TeacherNotFound(params.teacherId);

    await this.socketServer.connectTeacher(teacher);
  }
}
