import { BaseSocket, SocketServer } from '@app/infra/web-sockets';
import { UseCase } from '.';
import Student from '../entities/Student';
import { StudentNotFound } from '../errors';
import { StudentRepository } from '../repositories/StudentRepository';

type Params = {
  studentId: string;
  studentSocket: BaseSocket;
};

export class StudentConnectUseCase implements UseCase<Params, void> {
  constructor(private socketServer: SocketServer, private studentRepository: StudentRepository) {}

  async perform(params: Params): Promise<void> {
    const student = await this.studentRepository.findById(params.studentId);
    if (!student) throw new StudentNotFound(params.studentId);
    await this.socketServer.connectStudent(student, params.studentSocket);
  }
}
