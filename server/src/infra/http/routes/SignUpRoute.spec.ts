import User from '@app/core/entities/User';
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

    const { sut } = createSut();
    for await (const payload of payloads) {
      const result = await sut.handle({ body: payload });
      expect(result.statusCode).toBe(400);
    }
  });

  it('should insert in repository the user signed up', async () => {
    const { sut, userRepository } = createSut();

    const payload = validPayloadSample();
    const result = await sut.handle({ body: payload });

    expect(result.statusCode).toBe(200);
    const userSignedUp = await userRepository.findByEmail(payload.email);
    expect(userSignedUp).toBeDefined();
    expect(userSignedUp).toBeInstanceOf(User);
  });

  it('should return 409 status when the email already exists', async () => {
    const { sut } = createSut();
    const payload = validPayloadSample();

    await sut.handle({ body: payload });
    const result = await sut.handle({ body: payload });
    expect(result.statusCode).toBe(409);
  });
});

function validPayloadSample() {
  return {
    email: 'any_email@gmail.com',
    password: 'any123',
    name: 'Any',
    type: 'student',
  };
}

function createSut() {
  const userRepository = new UserRepositoryInMemory();
  const signUpUseCase = new SignUpUseCase(userRepository);
  const sut = new SignUpRoute(signUpUseCase);
  return { userRepository, signUpUseCase, sut };
}
