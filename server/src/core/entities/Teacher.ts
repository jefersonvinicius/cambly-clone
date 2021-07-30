import User, { UserTypes } from './User';

export default class Teacher extends User {
  constructor(name: string, email: string, password: string, createdAt: Date, updatedAt: Date) {
    super({ name, email, password, createdAt, updatedAt, type: UserTypes.Teacher });
  }
}
