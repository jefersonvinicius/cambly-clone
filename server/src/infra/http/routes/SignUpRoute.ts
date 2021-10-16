import SignUpUseCase, { SignUpPayload } from '@app/core/use-cases/SignUp';
import { getStatusCodeOf, StatusCode } from '../helpers';
import { HttpRequest } from '../HttpRequest';
import { HttpResponse, Route } from './Route';

export class SignUpRoute implements Route {
  constructor(private signUpUseCase: SignUpUseCase) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse<any>> {
    try {
      const payload: SignUpPayload = {
        email: httpRequest.body?.email,
        name: httpRequest.body?.name,
        password: httpRequest.body?.password,
        type: httpRequest.body?.type,
      };

      await this.signUpUseCase.perform(payload);
      return { statusCode: StatusCode.Ok };
    } catch (error: any) {
      return {
        statusCode: getStatusCodeOf(error),
        body: { message: error.message },
      };
    }
  }
}
