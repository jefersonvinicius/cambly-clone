import BaseEntity, { BaseEntityData } from './Base';

export default class User extends BaseEntity {
  private name: string;
  readonly email: string;
  private password: string;
  private type: UserTypes;

  constructor(data: UserConstructorData) {
    super(data);
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;

    if (!this.isValidType(data.type)) throw new InvalidUserType(data.type);

    this.type = data.type;
  }

  private isValidType(typeToValidate: string) {
    return Object.values(UserTypes).includes(typeToValidate as UserTypes);
  }
}

export class InvalidUserType extends Error {
  constructor(type: string) {
    super(`Invalid user type, expected [${Object.values(UserTypes).join(',')}]. But got ${type}`);
    this.name = 'InvalidUserType';
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
