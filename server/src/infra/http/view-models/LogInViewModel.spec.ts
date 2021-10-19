import { UserTypes } from '@app/core/entities/User';
import { createFakeUser } from '@tests/helpers';
import { LogInViewModel } from './LogInViewModel';

describe('LogInViewModel', () => {
  it('should stringify correctly', async () => {
    const sut = new LogInViewModel({
      accessToken: 'any_token',
      user: await createFakeUser({
        id: 'id',
        email: 'any_email@gmail.com',
        name: 'Any',
        type: UserTypes.Student,
        password: 'any',
        createdAt: new Date('2021-10-23T13:00:00.000Z'),
        updatedAt: new Date('2021-10-23T13:00:00.000Z'),
      }),
    });

    const parsed = JSON.parse(JSON.stringify(sut));

    expect(parsed).toEqual({
      accessToken: 'any_token',
      user: {
        id: 'id',
        email: 'any_email@gmail.com',
        name: 'Any',
        type: 'student',
        createdAt: '2021-10-23T13:00:00.000Z',
        updatedAt: '2021-10-23T13:00:00.000Z',
      },
    });
  });
});
