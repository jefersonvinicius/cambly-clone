import { getStatusCodeOf } from './helpers';

export class HttpResponseUtils {
  static createErrorResponse(error: any) {
    return { statusCode: getStatusCodeOf(error), body: error?.message ? { message: error.message } : undefined };
  }
}
