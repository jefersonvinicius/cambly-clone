import User, { UserTypes } from '@app/core/entities/User';
import { UserRepository } from '@app/core/repositories/UserRepository';
import { Connection, Repository } from 'typeorm';
import { Database } from '../database';
import { UserScheme, UserSchemeProperties } from '../database/schemes/UserScheme';

export class TypeORMUserRepository implements UserRepository {
  private userRepository: Repository<UserSchemeProperties>;

  constructor(private connection: Connection) {
    this.userRepository = this.connection.getRepository(UserScheme);
  }

  async insert(user: User): Promise<void> {
    const userToSave = this.userRepository.create({ ...user });
    await this.userRepository.save(userToSave);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = (await this.userRepository.findOne({ where: { email } })) ?? null;
    return user ? createUserFromUserScheme(user) : null;
  }

  async deleteById(id: string) {
    const { affected } = await this.userRepository.delete(id);
    return !!affected;
  }

  static async create() {
    const connection = await Database.getInstance();
    return new TypeORMUserRepository(connection);
  }
}

function createUserFromUserScheme(userSchemeProperties: UserSchemeProperties) {
  return new User({
    ...userSchemeProperties,
    type: userSchemeProperties.type as UserTypes,
  });
}
