import { createFakeTeacher, setupDatabaseTest, teardownDatabaseTest } from '@tests/helpers';
import { Connection } from 'typeorm';
import { TypeORMTeacherRepository } from './TypeORMTeacherRepository';

describe('TypeORMTeacherRepository suite test', () => {
  let connection: Connection;

  beforeAll(async () => {
    connection = await setupDatabaseTest();
  });

  afterAll(async () => {
    await teardownDatabaseTest();
  });

  it('Should insert a teacher successfully', async () => {
    const sut = new TypeORMTeacherRepository(connection);
    const teacher = await createFakeTeacher({
      id: 'any_id',
      name: 'Any Name',
      email: 'any_email@gmail.com',
      password: '123',
    });
    await sut.insert(teacher);
    const teacherInserted = await sut.findById('any_id');
    expect(teacherInserted).toMatchObject(teacher);
    await sut.deleteById('any_id');
  });
});
