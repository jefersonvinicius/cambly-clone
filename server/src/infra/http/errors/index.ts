export class AccessTokenInvalid extends Error {
  constructor() {
    super(`The token is invalid`);
    this.name = 'AccessTokenInvalid';
    Object.setPrototypeOf(this, AccessTokenInvalid.prototype);
  }
}

export class AccessTokenNotProvided extends Error {
  constructor() {
    super(`Access token not provided`);
    this.name = 'AccessTokenNotProvided';
    Object.setPrototypeOf(this, AccessTokenNotProvided.prototype);
  }
}
