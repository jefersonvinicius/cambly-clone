export class User {
  public name: string;
  public email: string;

  constructor(data: any) {
    this.name = data.name;
    this.email = data.email;
  }
}
