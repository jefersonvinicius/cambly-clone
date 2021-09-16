import { Server } from 'socket.io';
import SocketServer, { BaseSocket } from './SocketServer';
import http from 'http';
import { SocketServerIO } from './SocketIOEvents';

export function createIOServer(httpServerParam: http.Server) {
  const server = new Server(httpServerParam);
  return new SocketServerIO(server);
}

export enum EventsLabels {
  ConnectStudent = 'connect-student',
  ConnectTeacher = 'connect-teacher',
  TeacherOpenToLesson = 'teacher-open-to-lesson',
  StudentOpenToLesson = 'student-open-to-lesson',
  NewTeacherAvailable = 'new-teacher-available',
  NewStudentAvailable = 'new-student-available',
  StartLesson = 'start-lesson',
  TeacherStartLesson = 'teacher-start-lesson',
  StudentStartLesson = 'student-start-lesson',
  ConnectTeacherToBeChosen = 'connect-teacher-to-be-chosen',
  NewStudentRequest = 'new-student-request',
  RequestTeacherLesson = 'request-teacher-lesson',
  AcceptStudentRequest = 'accept-student-request',
  LessonStarted = 'lesson-started',
  NewLessonStarted = 'new-lesson-started',
}

export { SocketServer, BaseSocket };
