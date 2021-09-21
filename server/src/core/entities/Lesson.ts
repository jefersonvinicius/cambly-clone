import BaseEntity, { BaseEntityData } from './Base';

export default class Lesson extends BaseEntity {
  public code: string;
  public teacherId: string;
  public studentId: string;
  public endedAt?: Date;
  public startedAt?: Date;

  constructor(data: LessonConstructorData) {
    super(data);
    this.code = data.code ?? this.createCode();
    this.startedAt = data.startedAt;
    this.endedAt = data.endedAt;
    this.studentId = data.studentId;
    this.teacherId = data.teacherId;
  }

  private createCode() {
    return Math.random().toString(36).substr(2, 7);
  }
}

export type LessonConstructorData = {
  code?: string;
  teacherId: string;
  studentId: string;
  endedAt?: Date;
  startedAt?: Date;
} & BaseEntityData;
