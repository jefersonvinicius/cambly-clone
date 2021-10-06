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
