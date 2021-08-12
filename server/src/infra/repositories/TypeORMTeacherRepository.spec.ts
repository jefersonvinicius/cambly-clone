import { createFakeTeacher } from '@tests/helpers';
import { Connection } from 'typeorm';
import { Database } from '../database';
import { TypeORMTeacherRepository } from './TypeORMTeacherRepository';

describe('TypeORMTeacherRepository suite test', () => {
  let connection: Connection;

  beforeAll(async () => {
    connection = await Database.getTestInstance();
  });

  afterAll(async () => {
    await Database.cleanTestDatabase();
    await Database.disconnectTestInstance();
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
  });
});
