import Lesson from '@app/core/entities/Lesson';
import { LessonRepository } from '@app/core/repositories/LessonRepository';

export class LessonRepositoryInMemory implements LessonRepository {
  private lessons: Map<string, Lesson> = new Map();

  async findById(id: string): Promise<Lesson | null> {
    return this.lessons.get(id) ?? null;
  }

  async findByCode(code: string): Promise<Lesson | null> {
    return Array.from(this.lessons.values()).find((l) => l.code === code) ?? null;
  }

  async insert(lesson: Lesson): Promise<void> {
    this.lessons.set(lesson.id, lesson);
  }

  async deleteById(id: string): Promise<boolean> {
    if (!this.lessons.has(id)) return false;
    this.lessons.delete(id);
    return true;
  }
}
