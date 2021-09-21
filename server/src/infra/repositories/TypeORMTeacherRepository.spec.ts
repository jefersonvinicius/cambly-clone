import UUID from '@app/shared/UUID';
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
    const id = UUID.v4();
    const teacher = await createFakeTeacher({
      id: id,
      name: 'Any Name',
      email: 'any_email@gmail.com',
      password: '123',
    });
    await sut.insert(teacher);
    const teacherInserted = await sut.findById(id);
    expect(teacherInserted).toMatchObject(teacher);
    await sut.deleteById(id);
  });
});
