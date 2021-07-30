import { v4 as uuidV4 } from 'uuid';

export default abstract class User {
  private id: string;
  private name: string;
  private email: string;
  private password: string;
  private createdAt: Date;
  private updatedAt: Date;
  private type: UserTypes;

  constructor(data: UserConstructorData) {
    this.id = data.id ?? uuidV4();
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
    this.createdAt = data.createdAt ?? new Date();
    this.updatedAt = data.updatedAt ?? new Date();
    this.type = data.type;
  }
}

type UserConstructorData = {
  id?: string;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  type: UserTypes;
};

export enum UserTypes {
  Teacher = 'teacher',
  Student = 'student',
}
