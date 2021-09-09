import { StudentConnectUseCase } from '@app/core/use-cases/StudentConnect';
import { EventsLabels } from '@app/infra/web-sockets';
import { ConnectStudentEvent } from '@app/infra/web-sockets/events/ConnectStudentEvent';
import { SocketServerIO } from '@app/infra/web-sockets/SocketIOEvents';
import { StudentRepositoryInMemory } from '@tests/StudentRepositoryInMemory';
import { Socket as ClientSocket } from 'socket.io-client';
import { Socket as ServerSocket } from 'socket.io';

type ConnectTeacherData = {
  teacherId: string;
};

export function connectTeacherClient(socket: ClientSocket, data: ConnectTeacherData, callback?: Function) {
  return new Promise<void>((resolve) => {
    socket.emit(EventsLabels.ConnectTeacher, data, () => {
      callback?.();
      resolve();
    });
  });
}

type ConnectStudentData = {
  studentId: string;
};

export function connectStudentClient(socket: ClientSocket, data: ConnectStudentData, callback?: Function) {
  return new Promise<void>((resolve) => {
    socket.emit(EventsLabels.ConnectStudent, data, async () => {
      callback?.();
      resolve();
    });
  });
}

export function setupStudentConnectEvent(
  socket: ServerSocket,
  socketServer: SocketServerIO,
  studentRepository: StudentRepositoryInMemory
) {
  const connectStudentUseCase = new StudentConnectUseCase(socketServer, studentRepository);
  const connectStudentEvent = new ConnectStudentEvent(connectStudentUseCase);
  socket.on(EventsLabels.ConnectStudent, connectStudentEvent.createHandler(socket));
}
