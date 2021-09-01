import SocketServer, { BaseSocket } from './SocketServer';

export enum EventsLabels {
  ConnectStudent = 'connect-student',
  NewTeacherConnected = 'new-teacher-connected',
  ConnectTeacherToBeChosen = 'connect-teacher-to-be-chosen',
  NewStudentRequest = 'new-student-request',
  RequestTeacherLesson = 'request-teacher-lesson',
  AcceptStudentRequest = 'accept-student-request',
  LessonStarted = 'lesson-started',
}

export { SocketServer, BaseSocket };
