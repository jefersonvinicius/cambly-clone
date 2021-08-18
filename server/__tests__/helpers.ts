import Teacher, { TeacherConstructorData } from '@app/core/entities/Teacher';
import User, { UserConstructorData, UserTypes } from '@app/core/entities/User';
import { Database } from '@app/infra/database';
import { startHttpServer } from '@app/infra/http/server';
import { setupSocketIO } from '@app/infra/web-sockets/SocketIOEvents';
import { Hashing } from '@app/shared/Hashing';
import faker from 'faker';

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

export async function setupHttpServerAndSocket() {
  setupSocketIO();
  await startHttpServer();
}

export async function setupDatabaseTest() {
  const connection = await Database.getInstance();
  await connection.runMigrations();
  return connection;
}

export async function teardownDatabaseTest() {
  await Database.cleanTestDatabase();
  await Database.disconnectTestInstance();
}
