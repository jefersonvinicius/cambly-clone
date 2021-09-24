import Lesson from '@app/core/entities/Lesson';
import { LessonRepository } from '@app/core/repositories/LessonRepository';
import { Connection, Repository } from 'typeorm';
import { LessonSchema, LessonSchemaProperties } from '../database/schemas/LessonSchema';
import { LessonFactory } from '../factories/LessonFactory';
import { LessonMapper } from '../mappers/LessonMapper';

export class TypeORMLessonRepository implements LessonRepository {
  private lessonRepository: Repository<LessonSchemaProperties>;

  constructor(private connection: Connection) {
    this.lessonRepository = this.connection.getRepository(LessonSchema);
  }
  async save(lesson: Lesson): Promise<void> {
    await this.lessonRepository.save(LessonMapper.toLessonSchema(lesson));
  }

  async findById(id: string): Promise<Lesson | null> {
    const lessonSchema = await this.lessonRepository.findOne({ where: { id } });
    return lessonSchema ? LessonFactory.fromSchema(lessonSchema) : null;
  }

  async findByCode(code: string): Promise<Lesson | null> {
    const lessonSchema = await this.lessonRepository.findOne({ where: { code } });
    return lessonSchema ? LessonFactory.fromSchema(lessonSchema) : null;
  }

  async insert(lesson: Lesson): Promise<void> {
    await this.lessonRepository.save(LessonMapper.toLessonSchema(lesson));
  }

  async deleteById(id: string): Promise<boolean> {
    const { affected } = await this.lessonRepository.delete({ id });
    return Boolean(affected);
  }
}
