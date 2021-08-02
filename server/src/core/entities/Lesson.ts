import BaseEntity, { BaseEntityData } from './Base';

export default class Lesson extends BaseEntity {
  public code: string;
  public teacherId: string;
  public studentId: string;

  constructor(data: LessonConstructorData) {
    super(data);
    this.code = data.code ?? this.createCode();
    this.studentId = data.studentId;
    this.teacherId = data.teacherId;
  }

  private createCode() {
    return Math.random().toString(36).substr(2, 7);
  }
}

type LessonConstructorData = {
  code?: string;
  teacherId: string;
  studentId: string;
  endAt?: Date;
} & BaseEntityData;
