import { Database } from '../database';
import { TypeORMLessonRepository } from './TypeORMLessonRepository';
import { TypeORMStudentRepository } from './TypeORMStudentRepository';
import { TypeORMTeacherRepository } from './TypeORMTeacherRepository';
import { TypeORMUserRepository } from './TypeORMUserRepository';

export class RepositoriesFactory {
  static async createTeacherRepository() {
    return new TypeORMTeacherRepository(await Database.getInstance());
  }

  static async createStudentRepository() {
    return new TypeORMStudentRepository(await Database.getInstance());
  }

  static async createUserRepository() {
    return new TypeORMUserRepository(await Database.getInstance());
  }

  static async createLessonRepository() {
    return new TypeORMLessonRepository(await Database.getInstance());
  }
}
