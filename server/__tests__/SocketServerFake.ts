import RequestLesson from '@app/core/entities/RequestLesson';
import Teacher from '@app/core/entities/Teacher';
import { SocketServer } from '@app/infra/sockets';

export class FakeSocketServer implements SocketServer {
  private requests: RequestLesson[] = [];

  constructor(private teachers: Teacher[]) {}

  async teachersIds(): Promise<string[]> {
    return this.teachers.map((t) => t.id);
  }

  async hasTeacher(teacherId: string): Promise<boolean> {
    return this.teachers.map((t) => t.id).includes(teacherId);
  }

  async teacherIsBusy(teacherId: string): Promise<boolean> {
    return this.teachers.find((t) => t.id === teacherId)?.isBusy ?? false;
  }

  async setTeacherAsBusy(teacherId: string) {
    this.teachers = this.teachers.map((teacher) => {
      if (teacher.id === teacherId) {
        teacher.setBusy(true);
        return teacher;
      }
      return teacher;
    });
  }

  async requestTeacher(request: RequestLesson) {
    this.requests.push(request);
  }

  async hasRequest(requestId: string) {
    return !!this.requests.find((r) => r.id === requestId);
  }
}
