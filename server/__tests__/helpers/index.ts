import Student, { StudentConstructorData } from '@app/core/entities/Student';
import Teacher, { TeacherConstructorData } from '@app/core/entities/Teacher';
import User, { UserConstructorData, UserTypes } from '@app/core/entities/User';
import { Database } from '@app/infra/database';
import { ensureIsTestEnvironment } from '@app/shared/environment';
import { Hashing } from '@app/shared/Hashing';
import EventEmitter from 'events';
import faker from 'faker';
import { io, Socket } from 'socket.io-client';

export async function createFakeTeacher(data?: Partial<TeacherConstructorData>) {
  const name = data?.name ?? faker.name.firstName();
  return new Teacher({
    id: data?.id,
    name: name,
    email: data?.email ?? faker.internet.email(name),
    password: await Hashing.hash(data?.password ?? faker.internet.password(10)),
    busy: data?.busy,
    createdAt: data?.createdAt,
    updatedAt: data?.updatedAt,
  });
}

export async function createFakeUser(data?: Partial<UserConstructorData>) {
  const name = data?.name ?? faker.name.firstName();
  return new User({
    id: data?.id,
    name: name,
    email: data?.email ?? faker.internet.email(name),
    password: await Hashing.hash(data?.password ?? faker.internet.password(10)),
    createdAt: data?.createdAt,
    updatedAt: data?.updatedAt,
    type: data?.type ?? UserTypes.Student,
  });
}

export async function createFakeStudent(data?: Partial<StudentConstructorData>) {
  const name = data?.name ?? faker.name.firstName();
  return new Student({
    id: data?.id,
    name: name,
    email: data?.email ?? faker.internet.email(name),
    password: await Hashing.hash(data?.password ?? faker.internet.password(10)),
    createdAt: data?.createdAt,
    updatedAt: data?.updatedAt,
  });
}

export async function setupDatabaseTest() {
  ensureIsTestEnvironment();
  const connection = await Database.getInstance();
  await connection.runMigrations();
  return connection;
}

export async function teardownDatabaseTest() {
  ensureIsTestEnvironment();
  await Database.cleanTestDatabase();
  await Database.disconnectTestInstance();
}

type ProcessFunction = (incrementCalls: () => void) => void;

export function waitForCallbacks(amountCallbacks: number, process: ProcessFunction): Promise<void> {
  const emitter = new EventEmitter();
  return new Promise<void>((resolve) => {
    let callbackHasCalled = 0;

    emitter.on('callback-called', () => {
      callbackHasCalled++;
      if (callbackHasCalled === amountCallbacks) {
        resolve();
      }
    });

    function incrementCalls() {
      emitter.emit('callback-called');
    }

    process(incrementCalls);
  });
}

export function createIOClient() {
  return new Promise<Socket>((resolve) => {
    const client = io('http://localhost:3333');
    client.on('connect', () => resolve(client));
  });
}

export async function createTeacherClient(teacherData?: Partial<TeacherConstructorData>) {
  const teacher = await createFakeTeacher(teacherData);
  const socket = await createIOClient();
  return { socket, data: teacher, destroy };

  async function destroy() {
    socket.close();
  }
}

export async function createStudentClient(studentData?: Partial<StudentConstructorData>) {
  const student = await createFakeStudent(studentData);
  const socket = await createIOClient();

  return { socket, data: student, destroy };

  async function destroy() {
    socket.close();
  }
}
