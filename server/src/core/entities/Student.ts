import { BaseEntityData } from './Base';
import User, { UserConstructorData, UserTypes } from './User';

export default class Student extends User {
  constructor(data: StudentConstructorData) {
    super({ ...data, type: UserTypes.Student });
  }
}

export type StudentConstructorData = Omit<UserConstructorData, 'type'>;
