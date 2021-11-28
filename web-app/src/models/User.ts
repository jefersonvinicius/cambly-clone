export class User {
  public name: string;
  public email: string;
  public bio: string;
  private _image?: string;

  constructor(data: any) {
    this.name = data.name;
    this.email = data.email;
    this.bio = data.bio;
    this._image = data.image;
  }

  get image() {
    return this._image ?? "/assets/placeholder-avatar.png";
  }
}
