import RequestLesson from '@app/core/entities/RequestLesson';
import Student from '@app/core/entities/Student';
import Teacher from '@app/core/entities/Teacher';

export interface BaseSocket {
  id: string;
}

export default interface SocketServer<Socket = BaseSocket> {
  hasTeacher(teacherId: string): Promise<boolean>;
  hasStudent(studentId: string): Promise<boolean>;
  teacherIsBusy(teacherId: string): Promise<boolean>;
  setTeacherAsBusy(teacherId: string): Promise<void>;
  requestTeacher(request: RequestLesson): Promise<void>;
  teachersIds(): Promise<string[]>;
  teachersIdsNotBusy(): Promise<string[]>;
  connectTeacher(teacher: Teacher, teacherSocket: Socket): Promise<void>;
  connectStudent(student: Student, studentSocket: Socket): Promise<void>;
  socket(teacherIdOrUserId: string): Socket;
}
