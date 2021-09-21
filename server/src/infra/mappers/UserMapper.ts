import User from '@app/core/entities/User';
import { UserSchemaProperties } from '../database/schemas/UserSchema';

export class UserMapper {
  static toUserSchema(user: User): UserSchemaProperties {
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
