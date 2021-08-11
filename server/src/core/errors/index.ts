export class TeacherOffline extends Error {
  constructor(teacherId: string) {
    super(`The teacher ${teacherId} is offline`);
    this.name = 'TeacherOffline';
    Object.setPrototypeOf(this, TeacherOffline.prototype);
  }
}

export class TeacherIsBusy extends Error {
  constructor(teacherId: string) {
    super(`The teacher ${teacherId} is busy`);
    this.name = 'TeacherIsBusy';
  }
}

export class ParamNotProvided extends Error {
  constructor(paramName: string) {
    super(`The parameter not provided: ${paramName}`);
    this.name = 'ParamNotProvided';
    Object.setPrototypeOf(this, ParamNotProvided.prototype);
  }
}

export class EmailAlreadyExists extends Error {
  constructor(email: string) {
    super(`The email ${email} already exists`);
    this.name = 'EmailAlreadyExists';
    Object.setPrototypeOf(this, EmailAlreadyExists.prototype);
  }
}

export class UserWithEmailNotExists extends Error {
  constructor(email: string) {
    super(`The user with email ${email} not exists`);
    this.name = 'UserWithEmailNotExists';
    Object.setPrototypeOf(this, UserWithEmailNotExists.prototype);
  }
}

export class PasswordNotMatch extends Error {
  constructor() {
    super(`Passwords not match`);
    this.name = 'PasswordNotMatch';
    Object.setPrototypeOf(this, PasswordNotMatch.prototype);
  }
}

export class TeacherNotFound extends Error {
  constructor(teacherId: string) {
    super(`Teacher ${teacherId} not found`);
    this.name = 'TeacherNotFound';
    Object.setPrototypeOf(this, TeacherNotFound.prototype);
  }
}
