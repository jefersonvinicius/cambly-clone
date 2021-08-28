import SocketServer, { BaseSocket } from './SocketServer';

export enum EventsLabels {
  ConnectStudent = 'connect-student',
  NewTeacherConnected = 'new-teacher-connected',
  ConnectTeacherToBeChosen = 'connect-teacher-to-be-chosen',
  NewStudentRequest = 'new-student-request',
  RequestTeacherLesson = 'request-teacher-lesson',
}

export { SocketServer, BaseSocket };
