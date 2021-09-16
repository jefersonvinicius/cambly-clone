import { StudentConnectUseCase } from '@app/core/use-cases/StudentConnect';
import { EventsLabels } from '@app/infra/web-sockets';
import { ConnectStudentEvent } from '@app/infra/web-sockets/events/ConnectStudentEvent';
import { SocketServerIO } from '@app/infra/web-sockets/SocketIOEvents';
import { StudentRepositoryInMemory } from '@tests/StudentRepositoryInMemory';
import { Socket as ClientSocket } from 'socket.io-client';
import { Socket as ServerSocket } from 'socket.io';
import { ConnectTeacherEvent } from '@app/infra/web-sockets/events/ConnectTeacherEvent';
import { TeacherConnectUseCase } from '@app/core/use-cases/TeacherConnect';
import { TeacherRepositoryInMemory } from '@tests/TeacherRepositoryInMemory';
import { StudentOpenToLesson } from '@app/core/use-cases/StudentOpenToLesson';
import { StudentOpenToLessonEvent } from '@app/infra/web-sockets/events/StudentOpenToLessonEvent';
import { TeacherOpenToLessonUseCase } from '@app/core/use-cases/TeacherOpenToLesson';
import { TeacherOpenToLessonEvent } from '@app/infra/web-sockets/events/TeacherOpenToLessonEvent';

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

export function openStudentToLesson(studentSocket: ClientSocket, payload: { studentId: string }) {
  return new Promise<void>((resolve) => {
    studentSocket.emit(EventsLabels.StudentOpenToLesson, payload, () => {
      resolve();
    });
  });
}

export function openTeacherToLesson(teacherSocket: ClientSocket, payload: { teacherId: string }) {
  return new Promise<void>((resolve) => {
    teacherSocket.emit(EventsLabels.TeacherOpenToLesson, payload, () => {
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

export function setupStudentOpenToLessonEvent(socket: ServerSocket, socketServer: SocketServerIO) {
  const studentOpenToLessonUseCase = new StudentOpenToLesson(socketServer);
  const studentOpenToLessonEvent = new StudentOpenToLessonEvent(studentOpenToLessonUseCase);
  socket.on(EventsLabels.StudentOpenToLesson, studentOpenToLessonEvent.createHandler(socket));
}

export function setupTeacherConnectEvent(
  socket: ServerSocket,
  socketServer: SocketServerIO,
  teacherRepository: TeacherRepositoryInMemory
) {
  const connectTeacherUseCase = new TeacherConnectUseCase(socketServer, teacherRepository);
  const connectTeacherEvent = new ConnectTeacherEvent(connectTeacherUseCase);
  socket.on(EventsLabels.ConnectTeacher, connectTeacherEvent.createHandler(socket));
}

export function setupTeacherOpenToLessonEvent(socket: ServerSocket, socketServer: SocketServerIO) {
  const teacherOpenToLessonUseCase = new TeacherOpenToLessonUseCase(socketServer);
  const teacherOpenToLessonEvent = new TeacherOpenToLessonEvent(teacherOpenToLessonUseCase);
  socket.on(EventsLabels.TeacherOpenToLesson, teacherOpenToLessonEvent.createHandler(socket));
}
