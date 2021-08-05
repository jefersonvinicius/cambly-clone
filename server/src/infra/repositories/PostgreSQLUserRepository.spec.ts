import { Connection } from 'typeorm';
import { Database } from '../database';
import { PostgreSQLUserRepository } from './PostgreSQLUserRepository';

describe('PostgreSQLUserRepository suite tests', () => {
  let connection: Connection;

  beforeAll(async () => {
    connection = await Database.getTestInstance();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await Database.disconnectTestInstance();
  });

  it('Should return null when not found user by email', async () => {
    const userRepository = new PostgreSQLUserRepository(connection);
    const user = await userRepository.findByEmail('email_not_exists@gmail.com');
    expect(user).toBeNull();
  });
});
