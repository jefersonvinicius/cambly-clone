import Student from '../entities/Student';

export interface StudentRepository {
  findById(id: string): Promise<Student | null>;
  insert(student: Student): Promise<void>;
  deleteById(id: string): Promise<boolean>;
}
