import Teacher from '../entities/Teacher';

export interface TeacherRepository {
  findById(id: string): Promise<Teacher | null>;

  insert(teacher: Teacher): Promise<void>;
}
