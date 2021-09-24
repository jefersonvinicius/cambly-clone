import Student from '@app/core/entities/Student';
import Teacher from '@app/core/entities/Teacher';
import { EntitySchema } from 'typeorm';
import { BaseSchemaProperties, schemesBaseColumns } from '.';

export type LessonSchemaProperties = BaseSchemaProperties & {
  code: string;
  studentId: string;
  teacherId: string;
  startedAt?: string;
  endedAt?: string;
};

export const LessonSchema = new EntitySchema<LessonSchemaProperties>({
  name: 'lesson',
  tableName: 'lessons',
  columns: {
    ...schemesBaseColumns,
    code: {
      type: 'varchar',
      length: 50,
    },
    studentId: {
      name: 'student_id',
      type: 'uuid',
    },
    teacherId: {
      name: 'teacher_id',
      type: 'uuid',
    },
    startedAt: {
      name: 'started_at',
      type: 'timestamp',
      nullable: true,
    },
    endedAt: {
      name: 'ended_at',
      type: 'timestamp',
      nullable: true,
    },
  },
});
