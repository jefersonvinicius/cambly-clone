import { User } from "models/User";
import faker from "faker";

export function createUser() {
  const name = faker.name.findName();

  return new User({
    name: name,
    bio: faker.lorem.paragraphs(2),
    email: faker.internet.email(name),
  });
}
