import { SocketServer } from '@app/infra/web-sockets';
import { UseCase } from '.';
import Teacher from '../entities/Teacher';
import { TeacherRepository } from '../repositories/TeacherRepository';

export class StudentViewOnlineTeachersUseCase implements UseCase<{}, Teacher[]> {
  constructor(private socketServer: SocketServer, private teacherRepository: TeacherRepository) {}

  async perform(params: {}): Promise<Teacher[]> {
    const teachersIdsOnline = await this.socketServer.teachersIdsNotBusy();
    const teachers: Teacher[] = [];
    for await (const teacherId of teachersIdsOnline) {
      const teacher = await this.teacherRepository.findById(teacherId);
      if (teacher) teachers.push(teacher);
    }
    return teachers;
  }
}
