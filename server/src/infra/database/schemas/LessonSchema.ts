import Student from '@app/core/entities/Student';
import Teacher from '@app/core/entities/Teacher';
import { EntitySchema } from 'typeorm';
import { BaseSchemaProperties, schemesBaseColumns } from '.';

type LessonProperties = BaseSchemaProperties & {
  code: string;
  studentId: string;
  teacherId: string;
  student: Student;
  teacher: Teacher;
  startedAt?: string;
  endedAt?: string;
};

export const LessonSchema = new EntitySchema<LessonProperties>({
  name: 'lesson',
  tableName: 'lessons',
  columns: {
    ...schemesBaseColumns,
    code: {
      type: 'varchar',
      length: 50,
    },
    startedAt: {
      type: 'time with time zone',
      nullable: true,
    },
    endedAt: {
      type: 'time with time zone',
      nullable: true,
    },
  },
  relations: {
    student: {
      type: 'one-to-many',
      target: 'user',
    },
    teacher: {
      type: 'one-to-many',
      target: 'user',
    },
  },
});
