import Lesson from '@app/core/entities/Lesson';
import RequestLesson from '@app/core/entities/RequestLesson';
import Student from '@app/core/entities/Student';
import Teacher from '@app/core/entities/Teacher';
import { BaseSocket, SocketServer } from '@app/infra/web-sockets';

export class FakeSocketServer implements SocketServer {
  private _availableStudents: Map<string, Student> = new Map();
  private _availableTeachers: Map<string, Teacher> = new Map();
  private requests: RequestLesson[] = [];

  constructor(private teachers: Teacher[] = [], private students: Student[] = []) {}

  async emitNewLessonStartedEvent(lesson: Lesson): Promise<void> {}

  async removeStudentFromAvailable(studentId: string): Promise<void> {
    this._availableStudents.delete(studentId);
  }

  async removeTeacherFromAvailable(teacherId: string): Promise<void> {
    this._availableTeachers.delete(teacherId);
  }

  async teacherIsAvailable(teacherId: string): Promise<boolean> {
    return this._availableTeachers.has(teacherId);
  }

  async studentIsAvailable(studentId: string): Promise<boolean> {
    return this._availableStudents.has(studentId);
  }

  get teachersAvailable(): Teacher[] {
    return Array.from(this._availableTeachers.values());
  }

  get studentsAvailable(): Student[] {
    return Array.from(this._availableStudents.values());
  }

  async openTeacherToLesson(teacherId: string): Promise<void> {
    const teacher = this.teachers.find((t) => t.id === teacherId);
    if (teacher) this._availableTeachers.set(teacherId, teacher);
  }

  async emitNewTeacherAvailableEvent(teacherId: string): Promise<void> {}

  async emitNewStudentAvailableEvent(studentId: string): Promise<void> {}

  async openStudentToLesson(studentId: string): Promise<void> {
    const student = this.students.find((s) => s.id === studentId);
    if (student) this._availableStudents.set(studentId, student);
  }

  async setTeacherBusyStatus(teacherId: string, status: boolean): Promise<void> {
    this.teachers.forEach((teacher) => {
      if (teacher.id === teacherId) {
        teacher.setBusy(status);
      }
    });
  }

  async getLessonRequest(requestId: string): Promise<RequestLesson | null> {
    return this.requests.find((request) => request.id === requestId) ?? null;
  }

  async emitStudentStartLesson(studentId: string): Promise<void> {
    console.log('emitStudentStartLesson called');
  }

  async emitTeacherStartLesson(teacherId: string): Promise<void> {
    console.log('emitTeacherStartLesson called');
  }

  async hasLessonRequest(requestId: string): Promise<boolean> {
    return this.requests.some((request) => request.id === requestId);
  }

  async hasStudent(studentId: string): Promise<boolean> {
    return !!this.students.find((s) => s.id === studentId);
  }

  async connectStudent(student: Student, studentSocket: BaseSocket): Promise<void> {
    this.students.push(student);
  }

  socket(teacherIdOrUserId: string): BaseSocket {
    return { id: 'any' };
  }

  async connectTeacher(teacher: Teacher, teacherSocket: BaseSocket): Promise<void> {
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
