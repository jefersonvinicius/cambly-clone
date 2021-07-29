import Teacher from '../entities/Teacher';

export interface TeacherRepository {
  findAll(): Promise<Teacher[]>;
  findById(): Promise<Teacher>;
  save(): Promise<void>;
}
