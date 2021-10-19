import User from '@app/core/entities/User';
import { StudentViewModel } from './StudentViewModel';
import { ViewModel } from './base/ViewModel';

type Data = {
  user: User;
  accessToken: string;
};

export class LogInViewModel extends ViewModel<Data> {
  constructor(data: Data) {
    super(data);
  }

  toJSON() {
    return {
      accessToken: this.data.user,
      user: new StudentViewModel(this.data.user),
    };
  }
}
