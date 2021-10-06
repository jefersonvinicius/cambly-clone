import axios, { AxiosResponse } from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3333",
});

export class APIEndpoints {
  static logIn(data: LogInData) {
    return api.post<LogInData, AxiosResponse<LogInResponse>>("/login", data);
  }
}

export type LogInData = {
  email: string;
  password: string;
};

type LogInResponse = {
  accessToken: string;
};
