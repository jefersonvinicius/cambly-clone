export class AccessTokenInvalid extends Error {
  constructor(token: string) {
    super(`The token ${token} is invalid`);
    this.name = 'AccessTokenInvalid';
    Object.setPrototypeOf(this, AccessTokenInvalid.prototype);
  }
}
