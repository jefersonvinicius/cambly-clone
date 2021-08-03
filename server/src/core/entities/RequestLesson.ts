import BaseEntity, { BaseEntityData } from './Base';

export default class RequestLesson extends BaseEntity {
  readonly studentId: string;
  readonly teacherId: string;

  constructor(data: RequestLessonData) {
    super(data);
    this.studentId = data.studentId;
    this.teacherId = data.teacherId;
  }
}

export type RequestLessonData = BaseEntityData & {
  studentId: string;
  teacherId: string;
};
