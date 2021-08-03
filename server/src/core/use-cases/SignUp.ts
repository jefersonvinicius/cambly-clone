import { UseCase } from '.';
import User, { UserTypes } from '../entities/User';
import { ParamNotProvided } from '../errors';
import { UserRepository } from '../shared/repositories';

export default class SignUp implements UseCase<SignUpPayload, void> {
  constructor(private usersRepository: UserRepository) {}

  async perform(params: SignUpPayload): Promise<void> {
    if (!params.email) throw new ParamNotProvided('email');
    if (!params.password) throw new ParamNotProvided('password');
    if (!params.name) throw new ParamNotProvided('name');
    if (!params.type) throw new ParamNotProvided('type');

    const user = new User({
      email: params.email,
      name: params.name,
      password: params.password,
      type: params.type as UserTypes,
    });

    await this.usersRepository.insert(user);
  }
}

export type SignUpPayload = {
  name: string;
  email: string;
  password: string;
  type: string;
  photoUrl?: string;
};
