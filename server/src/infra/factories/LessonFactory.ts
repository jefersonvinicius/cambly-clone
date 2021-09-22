import Lesson from '@app/core/entities/Lesson';
import { LessonSchemaProperties } from '../database/schemas/LessonSchema';

export class LessonFactory {
  static fromSchema(lessonSchema: LessonSchemaProperties) {
    return new Lesson({
      ...lessonSchema,
      endedAt: lessonSchema.endedAt ? new Date(lessonSchema.endedAt) : undefined,
      startedAt: lessonSchema.startedAt ? new Date(lessonSchema.startedAt) : undefined,
    });
  }
}
