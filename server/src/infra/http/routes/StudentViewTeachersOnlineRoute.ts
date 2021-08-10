import { StudentViewOnlineTeachersUseCase } from '@app/core/use-cases/StudentViewOnlineTeachers';
import { getStatusCodeOf, StatusCode } from '../helpers';
import { TeacherViewModel } from '../view-models/TeacherViewModel';
import { HttpRequest, HttpResponse, Route } from './Route';

export class StudentViewOnlineTeachersRoute implements Route {
  constructor(private studentViewOnlineTeachersUseCase: StudentViewOnlineTeachersUseCase) {}

  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse> {
    try {
      const teachers = await this.studentViewOnlineTeachersUseCase.perform({});
      const teachersViewModel = teachers.map((teacher) => new TeacherViewModel(teacher));
      return {
        statusCode: StatusCode.Ok,
        body: { teachers: teachersViewModel },
      };
    } catch (error) {
      return {
        statusCode: getStatusCodeOf(error),
        body: { message: error.message },
      };
    }
  }
}
