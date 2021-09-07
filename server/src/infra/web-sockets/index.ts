import SocketServer, { BaseSocket } from './SocketServer';

export enum EventsLabels {
  ConnectStudent = 'connect-student',
  ConnectTeacher = 'connect-teacher',
  OpenTeacherToLesson = 'open-teacher-to-lesson',
  OpenStudentToLesson = 'open-student-to-lesson',
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
}

export { SocketServer, BaseSocket };
