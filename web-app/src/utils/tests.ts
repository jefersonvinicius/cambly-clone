import { AxiosResponse } from "axios";

type AxiosErrorConfig<T = undefined> = {
  statusCode: number;
  data?: T;
};

export function createAxiosErrorWith<T>(config: AxiosErrorConfig<T>) {
  return {
    response: {
      data: config.data,
      status: config.statusCode,
    },
  };
}

type ResponseConfig<T> = {
  data?: T;
  statusCode?: number;
};

export function createAxiosResponseWith<T>(
  config?: ResponseConfig<T>
): AxiosResponse<T> {
  return {
    data: config?.data ?? ({} as T),
    status: config?.statusCode ?? 200,
    statusText: "",
    config: {},
    headers: {},
    request: {},
  };
}

export function sleep(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), ms);
  });
}
