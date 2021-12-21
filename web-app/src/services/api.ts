import axios, { AxiosResponse } from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3333",
});

export class APIEndpoints {
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
