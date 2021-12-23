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
      if (error.response?.status === 404) throw new AccountNotFoundError();
      if (error.response?.status === 401) throw new InvalidCredentialsError();
      throw error;
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

export class AccountNotFoundError extends Error {
  constructor() {
    super("Account not found");
  }
}

export class InvalidCredentialsError extends Error {
  constructor() {
    super("Credentials invalid");
  }
}
