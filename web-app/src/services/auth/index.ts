import { AxiosResponse } from "axios";
import { api } from "services/api";

export class AuthService {
  static async logIn(data: LogInData): Promise<LogInResponse> {
    try {
      const { data: responseData } = await api.post<
        LogInData,
        AxiosResponse<LogInResponse>
      >("/login", data);

      return responseData;
    } catch (error: any) {
      if (error.response?.status === 404) throw new AccountNotFound();
    }
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

export class AccountNotFound extends Error {
  constructor() {
    super("Account not found");
  }
}
