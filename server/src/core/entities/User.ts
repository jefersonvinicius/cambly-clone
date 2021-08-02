import { v4 as uuidV4 } from 'uuid';
import BaseEntity, { BaseEntityData } from './Base';

export default abstract class User extends BaseEntity {
  private name: string;
  private email: string;
  private password: string;
  private type: UserTypes;

  constructor(data: UserConstructorData) {
    super(data);
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
    this.type = data.type;
  }
}

export type UserConstructorData = {
  name: string;
  email: string;
  password: string;
  type: UserTypes;
} & BaseEntityData;

export enum UserTypes {
  Teacher = 'teacher',
  Student = 'student',
}
