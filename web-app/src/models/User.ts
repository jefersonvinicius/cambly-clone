export class User {
  public name: string;
  public email: string;
  private _image?: string;

  constructor(data: any) {
    this.name = data.name;
    this.email = data.email;
    this._image = data.image;
  }

  get image() {
    return this._image ?? "/assets/placeholder-avatar.png";
  }
}
