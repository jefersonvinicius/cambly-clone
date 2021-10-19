import LogInUseCase, { LogInPayload } from '@app/core/use-cases/LogIn';
import { getStatusCodeOf, StatusCode } from '../helpers';
import { HttpRequest } from '../HttpRequest';
import { LogInViewModel } from '../view-models/LogInViewModel';
import { HttpResponse, Route } from './Route';

export class LogInRoute implements Route {
  constructor(private logInUseCase: LogInUseCase) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse<LogInViewModel>> {
    try {
      const payload: LogInPayload = {
        email: httpRequest.body?.email,
        password: httpRequest.body?.password,
      };

      const logInResult = await this.logInUseCase.perform(payload);
      return { statusCode: StatusCode.Ok, body: new LogInViewModel(logInResult) };
    } catch (error: any) {
      return {
        statusCode: getStatusCodeOf(error),
        body: { message: error.message },
      };
    }
  }
}
