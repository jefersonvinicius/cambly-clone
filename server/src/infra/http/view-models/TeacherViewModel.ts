import Teacher from '@app/core/entities/Teacher';
import { EntityViewModel } from '.';

export class TeacherViewModel extends EntityViewModel<Teacher> {
  hiddenFields = ['password'];
}
