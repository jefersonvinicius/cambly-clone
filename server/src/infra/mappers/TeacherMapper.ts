import Teacher from '@app/core/entities/Teacher';
import { UserSchemeProperties } from '../database/schemes/UserScheme';

export class TeacherMapper {
  static toUserScheme(teacher: Teacher): UserSchemeProperties {
    return {
      id: teacher.id,
      email: teacher.email,
      name: teacher.name,
      createdAt: teacher.createdAt.toUTCString(),
      updatedAt: teacher.updatedAt.toUTCString(),
      password: teacher.password,
      type: teacher.type,
    };
  }
}
