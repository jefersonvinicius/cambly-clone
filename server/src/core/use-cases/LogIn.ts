import { Hashing } from '@app/shared/Hashing';
import { JWT } from '@app/shared/JWT';
import { UseCase } from '.';
import { PasswordNotMatch, UserWithEmailNotExists } from '../errors';
import { UserRepository } from '../shared/repositories';

export default class LogIn implements UseCase<LogInPayload, Return> {
  constructor(private usersRepository: UserRepository) {}

  async perform(params: LogInPayload): Promise<Return> {
    const user = await this.usersRepository.findByEmail(params.email);
    if (!user) throw new UserWithEmailNotExists(params.email);

    if (!(await Hashing.compare(params.password, user.password))) {
      throw new PasswordNotMatch();
    }

    return { tokenAccess: JWT.create({ userId: user.id }) };
  }
}

export type Return = {
  tokenAccess: string;
};

export type LogInPayload = {
  email: string;
  password: string;
};
