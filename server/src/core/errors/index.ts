export class TeacherOffline extends Error {
  constructor(teacherId: string) {
    super(`The teacher ${teacherId} is offline`);
    this.name = 'TeacherOffline';
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
  }
}

export class EmailAlreadyExists extends Error {
  constructor(email: string) {
    super(`The email ${email} already exists`);
    this.name = 'EmailAlreadyExists';
  }
}
