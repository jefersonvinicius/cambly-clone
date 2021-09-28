import LogInUseCase from '@app/core/use-cases/LogIn';
import { UserRepositoryInMemory } from '@tests/UserRepositoryInMemory';
import { LogInRoute } from './LogInRoute';

describe('LogInRoute', () => {
  it('should return 404 when email isn"t not found', async () => {
    const { sut } = createSut();
    const result = await sut.handle({ body: { email: 'email_not_exists@gmail.com' } });
    expect(result.statusCode).toBe(404);
  });
});

function createSut() {
  const userRepository = new UserRepositoryInMemory();
  const logInUseCase = new LogInUseCase(userRepository);
  const sut = new LogInRoute(logInUseCase);
  return { userRepository, logInUseCase, sut };
}
