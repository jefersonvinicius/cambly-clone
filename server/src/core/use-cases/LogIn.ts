import { Hashing } from '@app/shared/Hashing';
import { JWT } from '@app/shared/JWT';
import { UseCase } from '.';
import User from '../entities/User';
import { PasswordNotMatch, UserWithEmailNotExists } from '../errors';
import { UserRepository } from '../repositories/UserRepository';

export default class LogInUseCase implements UseCase<LogInPayload, Return> {
  constructor(private usersRepository: UserRepository) {}

  async perform(params: LogInPayload): Promise<Return> {
    const user = await this.usersRepository.findByEmail(params.email);
    if (!user) throw new UserWithEmailNotExists(params.email);

    if (!(await Hashing.compare(params.password, user.password))) {
      throw new PasswordNotMatch();
    }

    return { accessToken: JWT.create({ userId: user.id }), user };
  }
}

export type Return = {
  accessToken: string;
  user: User;
};

export type LogInPayload = {
  email: string;
  password: string;
};

export type AccessTokenData = {
  userId: string;
};
