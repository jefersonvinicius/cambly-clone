import Lesson from '../entities/Lesson';

export interface LessonRepository {
  findById(id: string): Promise<Lesson | null>;
  findByCode(code: string): Promise<Lesson | null>;
  insert(lesson: Lesson): Promise<void>;
  deleteById(id: string): Promise<boolean>;
  save(lesson: Lesson): Promise<void>;
}
