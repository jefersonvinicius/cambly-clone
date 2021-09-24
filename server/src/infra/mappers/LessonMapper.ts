import Lesson from '@app/core/entities/Lesson';
import User from '@app/core/entities/User';
import { LessonSchemaProperties } from '../database/schemas/LessonSchema';
import { UserSchemaProperties } from '../database/schemas/UserSchema';

export class LessonMapper {
  static toLessonSchema(lesson: Lesson): LessonSchemaProperties {
    return {
      ...lesson,
      startedAt: lesson.startedAt?.toISOString(),
      endedAt: lesson.endedAt?.toISOString(),
      createdAt: lesson.createdAt.toISOString(),
      updatedAt: lesson.updatedAt.toISOString(),
    };
  }
}
