import { User, UserTypes } from "models/User";
import faker from "faker";
import { UUID } from "utils/uuid";

export function createUser() {
  const name = faker.name.findName();

  return new User({
    id: UUID.v4(),
    name: name,
    bio: faker.lorem.paragraphs(2),
    email: faker.internet.email(name),
    type: UserTypes.Teacher,
  });
}
