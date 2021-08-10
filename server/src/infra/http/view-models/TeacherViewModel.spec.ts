import { createFakeTeacher } from '@tests/helpers';
import { TeacherViewModel } from './TeacherViewModel';

describe('TeacherViewModel suite test', () => {
  it('Should hidden field present in property hiddenFields', async () => {
    const teacher = await createFakeTeacher({
      name: 'Any Name',
      email: 'any_email@gmail.com',
      password: '123',
    });
    const sut = new TeacherViewModel(teacher);

    expect(JSON.parse(JSON.stringify(sut))).toMatchObject({
      id: expect.any(String),
      name: 'Any Name',
      email: 'any_email@gmail.com',
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      type: 'teacher',
      busy: false,
    });
  });
});
