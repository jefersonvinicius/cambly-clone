import { JWT } from '@app/shared/JWT';
import { createFakeUser } from '@tests/helpers';
import { UserRepositoryInMemory } from '@tests/UserRepositoryInMemory';
import { PasswordNotMatch, UserWithEmailNotExists } from '../errors';
import LogInUseCase, { LogInPayload } from './LogIn';

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
    const result = await sut.perform(payload);

    expect(result.accessToken).toEqual(expect.any(String));
    expect(result.user).toEqual(user);

    const accessTokenDecoded = JWT.decode<UserJWT>(result.accessToken);
    expect(accessTokenDecoded).toMatchObject({ userId: user.id, iat: expect.any(Number) });
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
  const sut = new LogInUseCase(userRepositoryInMemory);
  return { sut, userRepositoryInMemory };
}
