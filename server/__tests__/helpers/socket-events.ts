import { EventsLabels } from '@app/infra/web-sockets';
import { Socket } from 'socket.io-client';

type ConnectTeacherData = {
  teacherId: string;
};

export function connectTeacher(socket: Socket, data: ConnectTeacherData) {
  return new Promise<void>((resolve) => {
    socket.emit(EventsLabels.ConnectTeacherToBeChosen, data, () => {
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
