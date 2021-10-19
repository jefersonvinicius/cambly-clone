import Teacher from '@app/core/entities/Teacher';
import { EntityViewModel } from './base/EntityViewModel';

export class TeacherViewModel extends EntityViewModel<Teacher> {
  hiddenFields = ['password'];
}
