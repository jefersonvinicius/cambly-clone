export class TeacherOffline extends Error {
  constructor(teacherId: string) {
    super(`The teacher with id ${teacherId} is offline`);
  }
}

export class TeacherIsBusy extends Error {
  constructor(teacherId: string) {
    super(`The teacher with id ${teacherId} is offline`);
  }
}
