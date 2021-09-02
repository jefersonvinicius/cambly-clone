import RequestLesson from '@app/core/entities/RequestLesson';
import Student from '@app/core/entities/Student';
import Teacher from '@app/core/entities/Teacher';
import { StudentConnectUseCase } from '@app/core/use-cases/StudentConnect';
import { StudentRequestLessonUseCase } from '@app/core/use-cases/StudentRequestLesson';
import { TeacherAcceptRequestUseCase } from '@app/core/use-cases/TeacherAcceptRequest';
import { TeacherConnectToBeChosenUseCase } from '@app/core/use-cases/TeacherConnectToBeChoose';
import { Server, Socket } from 'socket.io';
import { EventsLabels, SocketServer } from '.';
import { Database } from '../database';
import { httpServer } from '../http/server';
import { RepositoriesFactory } from '../repositories/RepositoriesFactory';
import { TypeORMStudentRepository } from '../repositories/TypeORMStudentRepository';
import { TypeORMTeacherRepository } from '../repositories/TypeORMTeacherRepository';
import { ConnectStudentEvent } from './events/ConnectStudentEvent';
import { ConnectTeacherToBeChosenEvent } from './events/ConnectTeacherToBeChosenEvent';
import { StudentRequestLessonEvent } from './events/StudentRequestLessonEvent';
import { TeacherAcceptRequestEvent } from './events/TeacherAcceptRequestEvent';

const io = new Server(httpServer);

export async function stopSocketIO() {
  io.close(console.log);
}

export async function setupSocketIO() {
  const socketServer = new SocketServerIO(io);
  const teacherRepository = await RepositoriesFactory.createTeacherRepository();
  const studentRepository = await RepositoriesFactory.createStudentRepository();

  const connectTeacherToBeChosenEvent = createTeacherToBeChosenEvent();
  const connectStudentEvent = createConnectStudentEvent();
  const studentRequestLessonEvent = createStudentRequestLessonEvent();
  const teacherAcceptRequestEvent = createTeacherAcceptRequestEvent();

  io.on('connection', (socket) => {
    socket.emit('ping');
    socket.on(EventsLabels.ConnectTeacherToBeChosen, connectTeacherToBeChosenEvent.createHandler(socket));
    socket.on(EventsLabels.ConnectStudent, connectStudentEvent.createHandler(socket));
    socket.on(EventsLabels.RequestTeacherLesson, studentRequestLessonEvent.createHandler(socket));
    socket.on(EventsLabels.AcceptStudentRequest, teacherAcceptRequestEvent.createHandler(socket));
  });

  function createTeacherToBeChosenEvent() {
    const connectTeacherToBeChosenUseCase = new TeacherConnectToBeChosenUseCase(socketServer, teacherRepository);
    return new ConnectTeacherToBeChosenEvent(connectTeacherToBeChosenUseCase);
  }

  function createConnectStudentEvent() {
    const studentConnectUseCase = new StudentConnectUseCase(socketServer, studentRepository);
    return new ConnectStudentEvent(studentConnectUseCase);
  }

  function createStudentRequestLessonEvent() {
    const requestTeacherLessonUseCase = new StudentRequestLessonUseCase(socketServer);
    return new StudentRequestLessonEvent(requestTeacherLessonUseCase);
  }

  function createTeacherAcceptRequestEvent() {
    const teacherAcceptRequestUseCase = new TeacherAcceptRequestUseCase(socketServer);
    return new TeacherAcceptRequestEvent(teacherAcceptRequestUseCase);
  }
}

class SocketServerIO implements SocketServer<Socket> {
  private requests: { [key: string]: RequestLesson } = {};
  private teachers: { [key: string]: Teacher } = {};
  private students: { [key: string]: Student } = {};
  private sockets: { [userId: string]: Socket } = {};

  constructor(private ioServer: Server) {}

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
