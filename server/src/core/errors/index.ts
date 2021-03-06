export class TeacherOffline extends Error {
  constructor(teacherId: string) {
    super(`The teacher ${teacherId} is offline`);
    this.name = 'TeacherOffline';
    Object.setPrototypeOf(this, TeacherOffline.prototype);
  }
}

export class StudentOffline extends Error {
  constructor(studentId: string) {
    super(`The student ${studentId} is offline`);
    this.name = 'StudentOffline';
    Object.setPrototypeOf(this, StudentOffline.prototype);
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

export class StudentNotFound extends Error {
  constructor(studentId: string) {
    super(`Student ${studentId} not found`);
    this.name = 'StudentNotFound';
    Object.setPrototypeOf(this, StudentNotFound.prototype);
  }
}

export class RequestLessonNotFound extends Error {
  constructor(requestId: string) {
    super(`Request lesson ${requestId} not found`);
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, RequestLessonNotFound.prototype);
  }
}

export class StudentUnavailable extends Error {
  constructor(studentId: string) {
    super(`Student ${studentId} isn't open to lesson`);
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, StudentUnavailable.prototype);
  }
}

export class TeacherUnavailable extends Error {
  constructor(teacherId: string) {
    super(`Teacher ${teacherId} isn't open to lesson`);
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, TeacherUnavailable.prototype);
  }
}

export class LessonNotFound extends Error {
  constructor(lessonId: string) {
    super(`Lesson ${lessonId} not found`);
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, LessonNotFound.prototype);
  }
}
