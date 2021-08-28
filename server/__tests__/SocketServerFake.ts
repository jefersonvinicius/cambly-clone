import RequestLesson from '@app/core/entities/RequestLesson';
import Student from '@app/core/entities/Student';
import Teacher from '@app/core/entities/Teacher';
import { BaseSocket, SocketServer } from '@app/infra/web-sockets';

export class FakeSocketServer implements SocketServer {
  private requests: RequestLesson[] = [];

  constructor(private teachers: Teacher[] = [], private students: Student[] = []) {}

  async hasStudent(studentId: string): Promise<boolean> {
    return !!this.students.find((s) => s.id === studentId);
  }

  async connectStudent(student: Student, studentSocket: BaseSocket): Promise<void> {
    this.students.push(student);
  }

  socket(teacherIdOrUserId: string): BaseSocket {
    throw new Error('Method not implemented.');
  }

  async connectTeacher(teacher: Teacher): Promise<void> {
    this.teachers.push(teacher);
  }

  async teachersIdsNotBusy(): Promise<string[]> {
    return this.teachers.filter((t) => !t.isBusy).map((t) => t.id);
  }

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

export class FakeSocket implements BaseSocket {
  constructor(public id: string) {}
}
