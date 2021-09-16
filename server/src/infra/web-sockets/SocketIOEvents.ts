import Lesson from '@app/core/entities/Lesson';
import RequestLesson from '@app/core/entities/RequestLesson';
import Student from '@app/core/entities/Student';
import Teacher from '@app/core/entities/Teacher';
import { Server, Socket } from 'socket.io';
import { EventsLabels, SocketServer } from '.';

export class SocketServerIO implements SocketServer<Socket> {
  private requests: { [key: string]: RequestLesson } = {};
  private teachers: { [key: string]: Teacher } = {};
  private students: { [key: string]: Student } = {};
  private _studentsAvailable: Map<string, Student> = new Map();
  private _teachersAvailable: Map<string, Teacher> = new Map();
  private sockets: { [userId: string]: Socket } = {};

  constructor(public io: Server) {}

  async studentIsAvailable(studentId: string): Promise<boolean> {
    return this._studentsAvailable.has(studentId);
  }

  async teacherIsAvailable(teacherId: string): Promise<boolean> {
    return this._teachersAvailable.has(teacherId);
  }
  async removeTeacherFromAvailable(teacherId: string): Promise<void> {
    this._teachersAvailable.delete(teacherId);
  }

  async removeStudentFromAvailable(studentId: string): Promise<void> {
    this._studentsAvailable.delete(studentId);
  }

  async emitNewLessonStartedEvent(lesson: Lesson): Promise<void> {
    const studentSocket = this.socket(lesson.studentId);
    const teacherSocket = this.socket(lesson.teacherId);
    this.io.to([studentSocket.id, teacherSocket.id]).emit(EventsLabels.NewLessonStarted, { lesson });
  }

  get teachersAvailable(): Teacher[] {
    return Array.from(this._teachersAvailable.values());
  }

  async openStudentToLesson(studentId: string): Promise<void> {
    this._studentsAvailable.set(studentId, this.students[studentId]);
  }

  async openTeacherToLesson(teacherId: string): Promise<void> {
    this._teachersAvailable.set(teacherId, this.teachers[teacherId]);
  }

  get studentsAvailable() {
    return Array.from(this._studentsAvailable.values());
  }

  availableTeachers(): Promise<{ [teacherId: string]: Socket }[]> {
    throw new Error('Method not implemented.');
  }

  async emitNewStudentAvailableEvent(studentId: string): Promise<void> {}

  async emitNewTeacherAvailableEvent(teacherId: string): Promise<void> {}

  async setTeacherBusyStatus(teacherId: string, status: boolean): Promise<void> {
    this.teachers[teacherId].setBusy(status);
  }

  async emitStudentStartLesson(studentId: string): Promise<void> {
    this.socket(studentId).emit(EventsLabels.LessonStarted);
  }

  async emitTeacherStartLesson(teacherId: string): Promise<void> {
    this.socket(teacherId).emit(EventsLabels.LessonStarted);
  }

  async getLessonRequest(requestId: string): Promise<RequestLesson | null> {
    return this.requests[requestId] ?? null;
  }

  async hasStudent(studentId: string): Promise<boolean> {
    return !!this.students[studentId];
  }

  async connectStudent(student: Student, studentSocket: Socket): Promise<void> {
    this.sockets[student.id] = studentSocket;
    this.students[student.id] = student;
  }

  socket(teacherIdOrUserId: string): Socket {
    return this.sockets[teacherIdOrUserId] ?? null;
  }

  getTeacherSocket(): Socket {
    throw new Error('Method not implemented.');
  }

  async hasTeacher(teacherId: string): Promise<boolean> {
    return !!this.sockets[teacherId];
  }

  async teacherIsBusy(teacherId: string): Promise<boolean> {
    return this.teachers[teacherId].isBusy;
  }

  async requestTeacher(request: RequestLesson): Promise<void> {
    const studentSocket = this.sockets[request.studentId];
    const teacherSocket = this.sockets[request.teacherId];
    const student = this.students[request.studentId];
    this.requests[request.id] = request;
    studentSocket.to(teacherSocket.id).emit(EventsLabels.NewStudentRequest, { student, request });
  }

  teachersIds(): Promise<string[]> {
    throw new Error('Method not implemented.');
  }

  teachersIdsNotBusy(): Promise<string[]> {
    throw new Error('Method not implemented.');
  }

  async connectTeacher(teacher: Teacher, socket: Socket): Promise<void> {
    this.teachers[teacher.id] = teacher;
    this.sockets[teacher.id] = socket;
  }
}
