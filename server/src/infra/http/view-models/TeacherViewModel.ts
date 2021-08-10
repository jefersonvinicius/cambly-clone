import Teacher from '@app/core/entities/Teacher';
import { ViewModel } from '.';

export class TeacherViewModel extends ViewModel<Teacher> {
  hiddenFields = ['password'];
}
