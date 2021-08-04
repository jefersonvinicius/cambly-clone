import Teacher, { TeacherConstructorData } from '@app/core/entities/Teacher';
import User, { UserConstructorData, UserTypes } from '@app/core/entities/User';
import { BcryptHashing } from '@app/shared/Hashing';
import faker from 'faker';

const hashing = new BcryptHashing();

export async function createFakeTeacher(data?: Partial<TeacherConstructorData>) {
  const name = data?.name ?? faker.name.firstName();
  return new Teacher({
    id: data?.id,
    name: name,
    email: data?.email ?? faker.internet.email(name),
    password: await hashing.hash(data?.password ?? faker.internet.password(10)),
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
    password: await hashing.hash(data?.password ?? faker.internet.password(10)),
    createdAt: data?.createdAt,
    updatedAt: data?.updatedAt,
    type: data?.type ?? UserTypes.Student,
  });
}
