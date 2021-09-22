import Lesson from '@app/core/entities/Lesson';
import Student from '@app/core/entities/Student';
import Teacher from '@app/core/entities/Teacher';
import { StudentRepository } from '@app/core/repositories/StudentRepository';
import { TeacherRepository } from '@app/core/repositories/TeacherRepository';
import UUID from '@app/shared/UUID';
import {
  createFakeLesson,
  createFakeStudent,
  createFakeTeacher,
  createFakeUser,
  setupDatabaseTest,
  teardownDatabaseTest,
} from '@tests/helpers';
import { Connection } from 'typeorm';
import { RepositoriesFactory } from './RepositoriesFactory';
import { TypeORMLessonRepository } from './TypeORMLessonRepository';

describe('TypeORMLessonRepository', () => {
  let connection: Connection;
  let student: Student;
  let teacher: Teacher;
  let studentRepository: StudentRepository;
  let teacherRepository: TeacherRepository;

  beforeAll(async () => {
    connection = await setupDatabaseTest();
    student = await createFakeStudent();
    teacher = await createFakeTeacher();
    studentRepository = await RepositoriesFactory.createStudentRepository();
    teacherRepository = await RepositoriesFactory.createTeacherRepository();
    await studentRepository.insert(student);
    await teacherRepository.insert(teacher);
  });

  afterAll(async () => {
    await teardownDatabaseTest();
  });

  it('should insert lesson successfully', async () => {
    const lesson = await createFakeLesson({ studentId: student.id, teacherId: teacher.id });
    const sut = new TypeORMLessonRepository(connection);
    await sut.insert(lesson);
    const lessonFound = await sut.findById(lesson.id);
    expect(lessonFound?.id).toBe(lesson.id);
  });

  it('should find by code successfully', async () => {
    const lesson = await createFakeLesson({ studentId: student.id, teacherId: teacher.id });
    const sut = new TypeORMLessonRepository(connection);
    await sut.insert(lesson);
    const lessonFound = await sut.findByCode(lesson.code);
    expect(lessonFound?.id).toBe(lesson.id);
  });

  it('should delete lesson successfully', async () => {
    const lesson = await createFakeLesson({ studentId: student.id, teacherId: teacher.id });
    const sut = new TypeORMLessonRepository(connection);

    await sut.insert(lesson);
    const lessonFound = await sut.findByCode(lesson.code);
    expect(lessonFound?.id).toBe(lesson.id);
    const wasDeleted = await sut.deleteById(lesson.id);
    expect(wasDeleted).toBe(true);
    expect(await sut.findById(lesson.id)).toBeNull();
  });

  it('should return false when try delete lesson does not exists', async () => {
    const sut = new TypeORMLessonRepository(connection);
    const wasDeleted = await sut.deleteById(UUID.v4());
    expect(wasDeleted).toBe(false);
  });
});
