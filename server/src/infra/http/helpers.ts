import { InvalidUserType } from '@app/core/entities/User';
import { EmailAlreadyExists, ParamNotProvided, PasswordNotMatch, UserWithEmailNotExists } from '@app/core/errors';

export function getStatusCodeOf(error: any) {
  console.log(`Getting status code of: ${error}`);
  if (error instanceof ParamNotProvided) return StatusCode.BadRequest;
  if (error instanceof EmailAlreadyExists) return StatusCode.Conflict;
  if (error instanceof InvalidUserType) return StatusCode.BadRequest;
  if (error instanceof UserWithEmailNotExists) return StatusCode.NotFound;
  if (error instanceof PasswordNotMatch) return StatusCode.Unauthorized;
  return StatusCode.ServerError;
}

export enum StatusCode {
  Ok = 200,
  BadRequest = 400,
  NotFound = 404,
  Conflict = 409,
  ServerError = 500,
  Unauthorized = 401,
}
