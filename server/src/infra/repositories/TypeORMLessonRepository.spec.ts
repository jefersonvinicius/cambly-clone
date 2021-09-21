import Lesson from '@app/core/entities/Lesson';
import { createFakeLesson, setupDatabaseTest, teardownDatabaseTest } from '@tests/helpers';
import { Connection } from 'typeorm';
import { RepositoriesFactory } from './RepositoriesFactory';

describe('TypeORMLessonRepository', () => {
  let connection: Connection;

  beforeAll(async () => {
    connection = await setupDatabaseTest();
  });

  afterAll(async () => {
    await teardownDatabaseTest();
  });

  it('should insert lesson successfully', async () => {
    const userRepository = await RepositoriesFactory.createStudentRepository();
    const teacherRepository = await RepositoriesFactory.createTeacherRepository();
    const lesson = await createFakeLesson();

    expect(lesson.code).toBeDefined();
  });
});
