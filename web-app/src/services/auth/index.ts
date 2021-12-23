import { AxiosResponse } from "axios";
import { api } from "services/api";

export class AuthService {
  static async logIn(data: LogInData): Promise<LogInResponse> {
    const { data: responseData } = await api.post<
      LogInData,
      AxiosResponse<LogInResponse>
    >("/login", data);
    return responseData;
  }
}

export type LogInData = {
  email: string;
  password: string;
};

type LogInResponse = {
  accessToken: string;
  user: any;
};
