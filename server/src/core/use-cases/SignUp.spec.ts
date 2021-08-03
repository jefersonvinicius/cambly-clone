import User, { InvalidUserType, UserTypes } from '../entities/User';
import { ParamNotProvided } from '../errors';
import { UserRepository } from '../shared/repositories';
import SignUp, { SignUpPayload } from './SignUp';

describe('SignUp use case suite tests', () => {
  it('Should be able sing up successfully', async () => {
    const payload: SignUpPayload = {
      email: 'any_email@gmail.com',
      name: 'any_name',
      password: '1a2b3c',
      type: UserTypes.Student,
    };
    const { sut, userRepositoryInMemory } = createSignupUseCase();
    await expect(sut.perform(payload)).resolves.not.toThrowError();
    expect(userRepositoryInMemory.findByEmail('any_email@gmail.com')).toBeTruthy();
  });

  it('Should not be able sing up when email is not provided', async () => {
    const payload: SignUpPayload = { email: '', name: 'any_name', password: '1a2b3c', type: UserTypes.Teacher };
    const { sut } = createSignupUseCase();
    return expect(sut.perform(payload)).rejects.toThrowError(new ParamNotProvided('email'));
  });

  it('Should not be able sing up when password is not provided', async () => {
    const payload: SignUpPayload = {
      email: 'any_email@gmail.com',
      name: 'any_name',
      password: '',
      type: UserTypes.Teacher,
    };
    const { sut } = createSignupUseCase();
    return expect(sut.perform(payload)).rejects.toThrowError(new ParamNotProvided('password'));
  });

  it('Should not be able sing up when name is not provided', async () => {
    const payload: SignUpPayload = {
      email: 'any_email@gmail.com',
      name: '',
      password: '1a2b3c',
      type: UserTypes.Teacher,
    };
    const { sut } = createSignupUseCase();
    return expect(sut.perform(payload)).rejects.toThrowError(new ParamNotProvided('name'));
  });

  it('Should not be able sing up when type is not provided', async () => {
    const payload: SignUpPayload = {
      email: 'any_email@gmail.com',
      name: 'any_name',
      password: '1a2b3c',
      type: '',
    };
    const { sut } = createSignupUseCase();
    return expect(sut.perform(payload)).rejects.toThrowError(new ParamNotProvided('type'));
  });

  it('Should not be able sing up when type is invalid', async () => {
    const payload: SignUpPayload = {
      email: 'any_email@gmail.com',
      name: 'any_name',
      password: '1a2b3c',
      type: 'invalid_type',
    };
    const { sut } = createSignupUseCase();
    return expect(sut.perform(payload)).rejects.toThrowError(new InvalidUserType('invalid_type'));
  });
});

function createSignupUseCase() {
  const userRepositoryInMemory = new UserRepositoryInMemory();
  const sut = new SignUp(userRepositoryInMemory);
  return { sut, userRepositoryInMemory };
}

class UserRepositoryInMemory implements UserRepository {
  public users: User[] = [];

  async insert(user: User): Promise<void> {
    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((u) => u.email === email) ?? null;
  }
}
