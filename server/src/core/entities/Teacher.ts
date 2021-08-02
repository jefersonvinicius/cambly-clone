import { BaseEntityData } from './Base';
import User, { UserConstructorData, UserTypes } from './User';

export default class Teacher extends User {
  private busy: boolean;

  constructor(data: TeacherConstructorData) {
    super({ ...data, type: UserTypes.Teacher });
    this.busy = data.busy ?? false;
  }

  setBusy(value: boolean) {
    this.busy = value;
  }

  get isBusy() {
    return this.busy;
  }
}

export type TeacherConstructorData = Omit<UserConstructorData, 'type'> & {
  busy?: boolean;
} & BaseEntityData;
