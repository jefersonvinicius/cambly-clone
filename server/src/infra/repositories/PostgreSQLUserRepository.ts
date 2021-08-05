import User, { UserTypes } from '@app/core/entities/User';
import { UserRepository } from '@app/core/repositories/UserRepository';
import { Connection } from 'typeorm';
import { UserScheme, UserSchemeProperties } from '../database/schemes/UserScheme';

export class PostgreSQLUserRepository implements UserRepository {
  constructor(private connection: Connection) {}

  insert(user: User): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async findByEmail(email: string): Promise<User | null> {
    const userRepository = this.connection.getRepository(UserScheme);
    const user = (await userRepository.findOne({ where: { email } })) ?? null;
    return user ? createUserFromUserScheme(user) : null;
  }
}

export function createUserFromUserScheme(userSchemeProperties: UserSchemeProperties) {
  return new User({
    ...userSchemeProperties,
    type: userSchemeProperties.type as UserTypes,
  });
}
