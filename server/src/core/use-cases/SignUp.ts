import { Hashing } from '@app/shared/Hashing';
import { UseCase } from '.';
import User, { UserTypes } from '../entities/User';
import { EmailAlreadyExists, ParamNotProvided } from '../errors';
import { UserRepository } from '../repositories/UserRepository';

export default class SignUpUseCase implements UseCase<SignUpPayload, void> {
  constructor(private usersRepository: UserRepository) {}

  async perform(params: SignUpPayload): Promise<void> {
    if (!params.email) throw new ParamNotProvided('email');
    if (!params.password) throw new ParamNotProvided('password');
    if (!params.name) throw new ParamNotProvided('name');
    if (!params.type) throw new ParamNotProvided('type');

    const userAlreadyExists = await this.usersRepository.findByEmail(params.email);
    if (userAlreadyExists) throw new EmailAlreadyExists(params.email);

    const user = new User({
      email: params.email,
      name: params.name,
      password: await Hashing.hash(params.password),
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
