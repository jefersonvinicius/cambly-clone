import { EventsLabels } from '@app/infra/web-sockets';
import { Socket } from 'socket.io-client';

type ConnectTeacherData = {
  teacherId: string;
};

export function connectTeacher(socket: Socket, data: ConnectTeacherData, callback?: Function) {
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

export function connectStudent(socket: Socket, data: ConnectStudentData, callback?: Function) {
  return new Promise<void>((resolve) => {
    socket.emit(EventsLabels.ConnectStudent, data, async () => {
      callback?.();
      resolve();
    });
  });
}
