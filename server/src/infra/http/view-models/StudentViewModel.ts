import Student from '@app/core/entities/Student';
import { EntityViewModel } from './base/EntityViewModel';

export class StudentViewModel extends EntityViewModel<Student> {
  hiddenFields = ['password'];
}
