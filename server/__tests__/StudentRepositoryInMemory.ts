import Student from '@app/core/entities/Student';
import { StudentRepository } from '@app/core/repositories/StudentRepository';

export class StudentRepositoryInMemory implements StudentRepository {
  private students: Student[] = [];

  async findById(id: string): Promise<Student | null> {
    return this.students.find((t) => t.id === id) ?? null;
  }

  async insert(student: Student): Promise<void> {
    this.students.push(student);
  }

  async deleteById(id: string): Promise<boolean> {
    this.students = this.students.filter((t) => t.id !== id);
    return true;
  }
}
