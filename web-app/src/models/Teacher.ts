import { User, RawUser, UserTypes } from "./User";

export class Teacher extends User {
  constructor(data: Omit<RawUser, "type">) {
    super({
      ...data,
      type: UserTypes.Teacher,
    });
  }
}
