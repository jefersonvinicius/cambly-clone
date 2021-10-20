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

type Data = {
  pathname: string;
  search: string;
  hash: string;
  state: null;
};

export function createRouterDomLocation(data: Partial<Data>) {
  return {
    pathname: data.pathname ?? "",
    search: data.hash ?? "",
    hash: data.hash ?? "",
    state: data.state ?? null,
  };
}
