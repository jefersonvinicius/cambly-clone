import { RawUser, User, UserTypes } from "models/User";
import faker from "faker";
import { UUID } from "utils/uuid";

export function createTeacher(userData?: Partial<RawUser>) {
  return new User({
    id: userData?.id ?? UUID.v4(),
    name: userData?.name ?? faker.name.firstName(),
    email: userData?.email ?? faker.internet.email(),
    bio: userData?.bio ?? faker.lorem.paragraph(3),
    image: userData?.image ?? faker.image.avatar(),
    type: UserTypes.Teacher,
  });
}
