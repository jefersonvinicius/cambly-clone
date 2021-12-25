import { Optional } from "utils/types";

export enum UserTypes {
  Student = "student",
  Teacher = "teacher",
}

export interface RawUser {
  id: string;
  name: string;
  email: string;
  bio: string;
  type: UserTypes;
  image: string;
}

export class User implements RawUser {
  public id: string;
  public name: string;
  public email: string;
  public bio: string;
  public type: UserTypes;
  private _image?: string;

  constructor(data: Optional<RawUser, "image">) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.bio = data.bio;
    this.type = data.type;
    this._image = data.image;
  }

  get image() {
    return this._image ?? "/assets/placeholder-avatar.png";
  }
}
