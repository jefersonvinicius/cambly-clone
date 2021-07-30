import User, { UserTypes } from './User';

export default class Student extends User {
  private busy: boolean;

  constructor(name: string, email: string, password: string, createdAt: Date, updatedAt: Date, busy?: boolean) {
    super({ name, email, password, createdAt, updatedAt, type: UserTypes.Student });
    this.busy = busy ?? false;
  }
}
