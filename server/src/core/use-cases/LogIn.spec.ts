import { JWT } from '@app/shared/JWT';
import { createFakeUser } from '@tests/helpers';
import User from '../entities/User';
import { PasswordNotMatch, UserWithEmailNotExists } from '../errors';
import { UserRepository } from '../shared/repositories';
import LogIn, { LogInPayload } from './LogIn';

type UserJWT = {
  userId: string;
};

describe('SignUp use case suite tests', () => {
  it('Should be able sing up successfully', async () => {
    const { sut, userRepositoryInMemory } = createLoginUseCase();
    const user = await createFakeUser({ email: 'correct_email@gmail.com', password: '1a2b3c' });
    await userRepositoryInMemory.insert(user);

    const payload: LogInPayload = {
      email: 'correct_email@gmail.com',
      password: '1a2b3c',
    };
    const { tokenAccess } = await sut.perform(payload);
    expect(tokenAccess).toEqual(expect.any(String));
    expect(JWT.decode<UserJWT>(tokenAccess)?.userId).toBe(user.id);
  });

  it('Should not be able sing up when email not exists', async () => {
    const { sut } = createLoginUseCase();
    const payload: LogInPayload = {
      email: 'email_not_exists@gmail.com',
      password: '1a2b3c',
    };
    await expect(sut.perform(payload)).rejects.toThrowError(new UserWithEmailNotExists('email_not_exists@gmail.com'));
  });

  it('Should not be able sing up when password not match', async () => {
    const { sut, userRepositoryInMemory } = createLoginUseCase();
    const user = await createFakeUser({ email: 'correct_email@gmail.com', password: '1a2b3c' });
    await userRepositoryInMemory.insert(user);

    const payload: LogInPayload = {
      email: 'correct_email@gmail.com',
      password: 'different_password',
    };
    await expect(sut.perform(payload)).rejects.toThrowError(new PasswordNotMatch());
  });
});

function createLoginUseCase() {
  const userRepositoryInMemory = new UserRepositoryInMemory();
  const sut = new LogIn(userRepositoryInMemory);
  return { sut, userRepositoryInMemory };
}

class UserRepositoryInMemory implements UserRepository {
  private users: User[] = [];

  async insert(user: User): Promise<void> {
    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((u) => u.email === email) ?? null;
  }
}
