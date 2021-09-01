import { Database } from '../database';
import { TypeORMStudentRepository } from './TypeORMStudentRepository';
import { TypeORMTeacherRepository } from './TypeORMTeacherRepository';

export class RepositoriesFactory {
  static async createTeacherRepository() {
    return new TypeORMTeacherRepository(await Database.getInstance());
  }

  static async createStudentRepository() {
    return new TypeORMStudentRepository(await Database.getInstance());
  }
}
