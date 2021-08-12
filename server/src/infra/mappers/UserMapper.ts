import User from '@app/core/entities/User';
import { UserSchemeProperties } from '../database/schemes/UserScheme';

export class UserMapper {
  static toUserScheme(user: User): UserSchemeProperties {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt.toUTCString(),
      updatedAt: user.updatedAt.toUTCString(),
      password: user.password,
      type: user.type,
    };
  }
}
