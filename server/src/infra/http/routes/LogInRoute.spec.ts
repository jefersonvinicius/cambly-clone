import LogInUseCase from '@app/core/use-cases/LogIn';
import { JWT } from '@app/shared/JWT';
import { createFakeUser } from '@tests/helpers';
import { UserRepositoryInMemory } from '@tests/UserRepositoryInMemory';
import { LogInViewModel } from '../view-models/LogInViewModel';
import { UserViewModel } from '../view-models/UserViewModel';
import { LogInRoute } from './LogInRoute';

describe('LogInRoute', () => {
  it('should return 404 when email isn"t not found', async () => {
    const { sut } = createSut();
    const result = await sut.handle({ body: { email: 'email_not_exists@gmail.com' } });
    expect(result.statusCode).toBe(404);
  });

  it('should return 401 when email isn"t not found', async () => {
    const { sut, userRepository } = createSut();
    const user = await createFakeUser({ ...validPayloadSample() });
    await userRepository.insert(user);

    const result = await sut.handle({ body: { email: 'any_email@gmail.com', password: 'wrong' } });

    expect(result.statusCode).toBe(401);
  });

  it('should return access token when the user log in successfully', async () => {
    jest.spyOn(JWT, 'create').mockReturnValue('any_token');

    const { sut, userRepository } = createSut();
    const user = await createFakeUser({ ...validPayloadSample() });
    await userRepository.insert(user);

    const result = await sut.handle({ body: validPayloadSample() });

    expect(result.body).toMatchObject(new LogInViewModel({ user, accessToken: 'any_token' }));
  });
});

function validPayloadSample() {
  return {
    email: 'any_email@gmail.com',
    password: 'any123',
  };
}

function createSut() {
  const userRepository = new UserRepositoryInMemory();
  const logInUseCase = new LogInUseCase(userRepository);
  const sut = new LogInRoute(logInUseCase);
  return { userRepository, logInUseCase, sut };
}
