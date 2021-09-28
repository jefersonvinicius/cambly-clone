import LogInUseCase, { LogInPayload } from '@app/core/use-cases/LogIn';
import { getStatusCodeOf, StatusCode } from '../helpers';
import { HttpRequest, HttpResponse, Route } from './Route';

export class LogInRoute implements Route {
  constructor(private logInUseCase: LogInUseCase) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse<any>> {
    try {
      const payload: LogInPayload = {
        email: httpRequest.body?.email,
        password: httpRequest.body?.password,
      };

      const jwt = await this.logInUseCase.perform(payload);
      return { statusCode: StatusCode.Ok, body: jwt };
    } catch (error: any) {
      return {
        statusCode: getStatusCodeOf(error),
        body: { message: error.message },
      };
    }
  }
}
