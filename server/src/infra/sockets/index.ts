import RequestLesson from '@app/core/entities/RequestLesson';
import Teacher from '@app/core/entities/Teacher';

export interface SocketServer {
  hasTeacher(teacherId: string): Promise<boolean>;

  teacherIsBusy(teacherId: string): Promise<boolean>;

  setTeacherAsBusy(teacherId: string): Promise<void>;

  requestTeacher(request: RequestLesson): Promise<void>;

  teachersIds(): Promise<string[]>;

  teachersIdsNotBusy(): Promise<string[]>;
}
