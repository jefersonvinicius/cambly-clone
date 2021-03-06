import User, { UserTypes } from '@app/core/entities/User';
import { setupDatabaseTest, teardownDatabaseTest } from '@tests/helpers';
import { Connection } from 'typeorm';
import { TypeORMUserRepository } from './TypeORMUserRepository';

describe('TypeORMUserRepository suite tests', () => {
  let connection: Connection;

  beforeAll(async () => {
    connection = await setupDatabaseTest();
  });

  afterAll(async () => {
    await teardownDatabaseTest();
  });

  it('Should return null when not found user by email', async () => {
    const userRepository = new TypeORMUserRepository(connection);
    const user = await userRepository.findByEmail('email_not_exists@gmail.com');
    expect(user).toBeNull();
  });

  it('Should return user by email successfully', async () => {
    const userRepository = new TypeORMUserRepository(connection);
    const user = new User({
      email: 'any_email@gmail.com',
      name: 'Any',
      password: 'any_password',
      type: UserTypes.Student,
    });

    await userRepository.insert(user);
    const userFound = await userRepository.findByEmail('any_email@gmail.com');
    expect(userFound?.id).toBe(user.id);
    expect(userFound?.email).toBe('any_email@gmail.com');

    await userRepository.deleteById(user.id);
  });
});
