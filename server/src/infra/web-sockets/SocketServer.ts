import RequestLesson from '@app/core/entities/RequestLesson';
import Student from '@app/core/entities/Student';
import Teacher from '@app/core/entities/Teacher';

export interface BaseSocket {
  id: string;
}

export default interface SocketServer<Socket = BaseSocket> {
  get studentsAvailable(): Student[];
  get teachersAvailable(): Teacher[];
  hasTeacher(teacherId: string): Promise<boolean>;
  hasStudent(studentId: string): Promise<boolean>;
  teacherIsBusy(teacherId: string): Promise<boolean>;
  setTeacherBusyStatus(teacherId: string, status: boolean): Promise<void>;
  requestTeacher(request: RequestLesson): Promise<void>;
  teachersIds(): Promise<string[]>;
  teachersIdsNotBusy(): Promise<string[]>;
  connectTeacher(teacher: Teacher, teacherSocket: Socket): Promise<void>;
  connectStudent(student: Student, studentSocket: Socket): Promise<void>;
  emitStudentStartLesson(studentId: string): Promise<void>;
  emitTeacherStartLesson(teacherId: string): Promise<void>;
  socket(teacherIdOrUserId: string): Socket;
  getLessonRequest(requestId: string): Promise<RequestLesson | null>;
  openStudentToLesson(studentId: string): Promise<void>;
  openTeacherToLesson(teacherId: string): Promise<void>;

  emitNewStudentAvailableEvent(studentId: string): Promise<void>;
  emitNewTeacherAvailableEvent(teacherId: string): Promise<void>;
  studentIsAvailable(studentId: string): Promise<boolean>;
  teacherIsAvailable(teacherId: string): Promise<boolean>;
  removeTeacherFromAvailable(teacherId: string): Promise<void>;
  removeStudentFromAvailable(studentId: string): Promise<void>;
}
