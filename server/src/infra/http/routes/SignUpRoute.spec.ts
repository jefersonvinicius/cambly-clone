import SignUpUseCase from '@app/core/use-cases/SignUp';
import { UserRepositoryInMemory } from '@tests/UserRepositoryInMemory';
import { SignUpRoute } from './SignUpRoute';

describe('SignUpRoute', () => {
  it('should return 400 when payload is invalid', async () => {
    const payloads = [
      { email: 'any_email@gmail.com', password: 'any123', name: 'Any' },
      { email: 'any_email@gmail.com', password: 'any123', type: 'student' },
      { email: 'any_email@gmail.com', name: 'Any', type: 'student' },
      { password: 'any123', name: 'Any', type: 'student' },
      { email: 'any_email@gmail.com', password: 'any123', name: 'Any', type: 'invalid' },
    ];

    const userRepository = new UserRepositoryInMemory();
    const signUpUseCase = new SignUpUseCase(userRepository);
    const signupRoute = new SignUpRoute(signUpUseCase);

    for await (const payload of payloads) {
      const result = await signupRoute.handle({ body: payload });
      expect(result.statusCode).toBe(400);
    }
  });
});
