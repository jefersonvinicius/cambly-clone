import BaseEntity, { BaseEntityData } from './Base';

const SECOND = 1000;
const MINUTE = 60 * SECOND;

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

  get durationTime() {
    if (!this.endedAt || !this.startedAt) return 0;
    return this.endedAt.getTime() - this.startedAt.getTime();
  }

  get durationInMinutes() {
    if (!this.durationTime) return 0;
    return Math.round(this.durationTime / MINUTE);
  }

  get finished() {
    return !!this.endedAt;
  }

  private createCode() {
    return Math.random().toString(36).substr(2, 7);
  }

  clone() {
    return new Lesson({ ...this });
  }
}

export type LessonConstructorData = {
  code?: string;
  teacherId: string;
  studentId: string;
  endedAt?: Date;
  startedAt?: Date;
} & BaseEntityData;
