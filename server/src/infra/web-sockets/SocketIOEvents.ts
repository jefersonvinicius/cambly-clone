import RequestLesson from '@app/core/entities/RequestLesson';
import Teacher from '@app/core/entities/Teacher';
import { TeacherConnectToBeChosenUseCase } from '@app/core/use-cases/TeacherConnectToBeChoose';
import { Server } from 'socket.io';
import { EventsLabels, SocketServer } from '.';
import { Database } from '../database';
import { httpServer } from '../http/server';
import { TypeORMTeacherRepository } from '../repositories/TypeORMTeacherRepository';
import { ConnectTeacherToBeChosenEvent } from './events/ConnectTeacherToBeChosenEvent';

export async function setupSocketIO() {
  const io = new Server(httpServer);

  const socketServer = new SocketServerIO(io);
  const teacherRepository = new TypeORMTeacherRepository(await Database.getInstance());

  const connectTeacherToBeChosenEvent = createTeacherToBeChosenEvent();

  io.on('connection', (socket) => {
    socket.emit('ping');
    socket.on(EventsLabels.ConnectTeacherToBeChosen, connectTeacherToBeChosenEvent.createHandler(socket));
  });

  function createTeacherToBeChosenEvent() {
    const connectTeacherToBeChosenUseCase = new TeacherConnectToBeChosenUseCase(socketServer, teacherRepository);
    return new ConnectTeacherToBeChosenEvent(connectTeacherToBeChosenUseCase);
  }
}

class SocketServerIO implements SocketServer {
  private teachers: { [key: string]: Teacher } = {};

  constructor(private ioServer: Server) {}
  hasTeacher(teacherId: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  teacherIsBusy(teacherId: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  setTeacherAsBusy(teacherId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  requestTeacher(request: RequestLesson): Promise<void> {
    throw new Error('Method not implemented.');
  }
  teachersIds(): Promise<string[]> {
    throw new Error('Method not implemented.');
  }
  teachersIdsNotBusy(): Promise<string[]> {
    throw new Error('Method not implemented.');
  }

  async connectTeacher(teacher: Teacher): Promise<void> {
    this.teachers[teacher.id] = teacher;
  }
}
