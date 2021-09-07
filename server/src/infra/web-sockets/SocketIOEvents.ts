import RequestLesson from '@app/core/entities/RequestLesson';
import Student from '@app/core/entities/Student';
import Teacher from '@app/core/entities/Teacher';
import { StudentConnectUseCase } from '@app/core/use-cases/StudentConnect';
import { StudentRequestLessonUseCase } from '@app/core/use-cases/StudentRequestLesson';
import { Server, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { EventsLabels, SocketServer } from '.';
import { Database } from '../database';
import { httpServer } from '../http/server';
import { RepositoriesFactory } from '../repositories/RepositoriesFactory';
import { TypeORMStudentRepository } from '../repositories/TypeORMStudentRepository';
import { TypeORMTeacherRepository } from '../repositories/TypeORMTeacherRepository';
import { ConnectStudentEvent } from './events/ConnectStudentEvent';
const io = new Server(httpServer);

export async function stopSocketIO() {
  io.close(console.log);
}

export async function setupSocketIO() {
  const socketServer = new SocketServerIO(io);
  const teacherRepository = await RepositoriesFactory.createTeacherRepository();
  const studentRepository = await RepositoriesFactory.createStudentRepository();

  const connectStudentEvent = createConnectStudentEvent();
  io.on('connection', (socket) => {
    socket.emit('ping');
    socket.on(EventsLabels.ConnectStudent, connectStudentEvent.createHandler(socket));
  });

  function createConnectStudentEvent() {
    const studentConnectUseCase = new StudentConnectUseCase(socketServer, studentRepository);
    return new ConnectStudentEvent(studentConnectUseCase);
  }
}

class SocketServerIO implements SocketServer<Socket> {
  private requests: { [key: string]: RequestLesson } = {};
  private teachers: { [key: string]: Teacher } = {};
  private students: { [key: string]: Student } = {};
  private sockets: { [userId: string]: Socket } = {};

  constructor(private ioServer: Server) {}
  openStudentToLesson(studentId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  openTeacherToLesson(teacherId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  availableStudents(): Promise<{ [studentId: string]: Socket }[]> {
    throw new Error('Method not implemented.');
  }
  availableTeachers(): Promise<{ [teacherId: string]: Socket }[]> {
    throw new Error('Method not implemented.');
  }
  emitNewStudentAvailableEvent(studentId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  emitNewTeacherAvailableEvent(teacherId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

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

  hasStudent(studentId: string): Promise<boolean> {
    throw new Error('Method not implemented.');
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
