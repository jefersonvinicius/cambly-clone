import UUID from '@app/shared/UUID';
import { createFakeStudent, setupDatabaseTest, teardownDatabaseTest } from '@tests/helpers';
import { Connection } from 'typeorm';
import { TypeORMStudentRepository } from './TypeORMStudentRepository';

describe('TypeORMStudentRepository suite test', () => {
  let connection: Connection;

  beforeAll(async () => {
    connection = await setupDatabaseTest();
  });

  afterAll(async () => {
    await teardownDatabaseTest();
  });

  it('Should insert a student successfully', async () => {
    const sut = new TypeORMStudentRepository(connection);
    const id = UUID.v4();
    const student = await createFakeStudent({
      id: id,
      name: 'Any Name',
      email: 'any_email@gmail.com',
      password: '123',
    });
    await sut.insert(student);
    const studentInserted = await sut.findById(id);
    expect(studentInserted).toMatchObject(student);
    await sut.deleteById(id);
  });
});
