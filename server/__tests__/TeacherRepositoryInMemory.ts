import Teacher from '@app/core/entities/Teacher';
import User from '@app/core/entities/User';
import { TeacherRepository } from '@app/core/repositories/TeacherRepository';

export class TeacherRepositoryInMemory implements TeacherRepository {
  private teachers: Teacher[] = [];

  async findById(id: string): Promise<Teacher | null> {
    return this.teachers.find((t) => t.id === id) ?? null;
  }

  async insert(teacher: Teacher): Promise<void> {
    this.teachers.push(teacher);
  }

  async deleteById(id: string): Promise<boolean> {
    this.teachers = this.teachers.filter((t) => t.id !== id);
    return true;
  }
}
