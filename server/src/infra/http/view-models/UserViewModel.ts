import User from '@app/core/entities/User';
import { EntityViewModel } from './base/EntityViewModel';

export class UserViewModel extends EntityViewModel<User> {
  hiddenFields = ['password'];
}
