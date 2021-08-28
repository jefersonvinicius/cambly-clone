import RequestLesson from '@app/core/entities/RequestLesson';
import Student from '@app/core/entities/Student';
import Teacher from '@app/core/entities/Teacher';
import { StudentConnectUseCase } from '@app/core/use-cases/StudentConnect';
import { TeacherConnectToBeChosenUseCase } from '@app/core/use-cases/TeacherConnectToBeChoose';
import { Server, Socket } from 'socket.io';
import { EventsLabels, SocketServer } from '.';
import { Database } from '../database';
import { httpServer } from '../http/server';
import { TypeORMStudentRepository } from '../repositories/TypeORMStudentRepository';
import { TypeORMTeacherRepository } from '../repositories/TypeORMTeacherRepository';
import { ConnectStudentEvent } from './events/ConnectStudentEvent';
import { ConnectTeacherToBeChosenEvent } from './events/ConnectTeacherToBeChosenEvent';

export async function setupSocketIO() {
  const io = new Server(httpServer);

  const socketServer = new SocketServerIO(io);
  const teacherRepository = new TypeORMTeacherRepository(await Database.getInstance());
  const studentRepository = new TypeORMStudentRepository(await Database.getInstance());

  const connectTeacherToBeChosenEvent = createTeacherToBeChosenEvent();
  const connectStudentEvent = createConnectStudentEvent();
  // const studentRequestLessonEvent = createStudentRequestLessonEvent();

  io.on('connection', (socket) => {
    socket.emit('ping');
    socket.on(EventsLabels.ConnectTeacherToBeChosen, connectTeacherToBeChosenEvent.createHandler(socket));
    socket.on(EventsLabels.ConnectStudent, connectStudentEvent.createHandler(socket));
    // socket.on(EventsLabels.RequestTeacherLesson, studentRequestLessonEvent.createHandler(socket));
  });

  function createTeacherToBeChosenEvent() {
    const connectTeacherToBeChosenUseCase = new TeacherConnectToBeChosenUseCase(socketServer, teacherRepository);
    return new ConnectTeacherToBeChosenEvent(connectTeacherToBeChosenUseCase, socketServer);
  }

  function createConnectStudentEvent() {
    const studentConnectUseCase = new StudentConnectUseCase(socketServer, studentRepository);
    return new ConnectStudentEvent(studentConnectUseCase);
  }

  // function createStudentRequestLessonEvent() {
  //   const requestTeacherLessonUseCase = new StudentRequestLessonUseCase(socketServer);
  //   return new StudentRequestLessonEvent(requestTeacherLessonUseCase, socketServer);
  // }
}

class SocketServerIO implements SocketServer<Socket> {
  private teachers: { [key: string]: Teacher } = {};
  private students: { [key: string]: Student } = {};
  private sockets: { [userId: string]: Socket } = {};

  constructor(private ioServer: Server) {}

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

  setTeacherAsBusy(teacherId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async requestTeacher(request: RequestLesson): Promise<void> {
    const studentSocket = this.sockets[request.studentId];
    const teacherSocket = this.sockets[request.teacherId];
    studentSocket.to(teacherSocket.id).emit(EventsLabels.NewStudentRequest);
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
