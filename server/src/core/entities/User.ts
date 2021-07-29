export default abstract class User {
  private name: string;
  private email: string;
  private password: string;
  private createdAt: Date;
  private updatedAt: Date;
  private type: UserTypes;

  constructor(name: string, email: string, password: string, createdAt: Date, updatedAt: Date, type: UserTypes) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.type = type;
  }
}

export enum UserTypes {
  Teacher = 'teacher',
  Student = 'student',
}
