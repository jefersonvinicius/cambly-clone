import User from '@app/core/entities/User';
import { UserViewModel } from './UserViewModel';
import { ViewModel } from './base/ViewModel';

type Data = {
  user: User;
  accessToken: string;
};

export class LogInViewModel extends ViewModel<Data> {
  public accessToken: string;
  public user: User;

  constructor(data: Data) {
    super(data);
    this.accessToken = data.accessToken;
    this.user = data.user;
  }

  toJSON() {
    return {
      accessToken: this.data.accessToken,
      user: new UserViewModel(this.data.user),
    };
  }
}
