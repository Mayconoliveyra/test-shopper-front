import { AxiosError } from "axios";

import { ResponseError } from "..";

export const errorInterceptor = (error: AxiosError<ResponseError>) => {
  if (error.message === "Network Error") {
    return Promise.reject(new Error("Erro de conexão."));
  }

  return Promise.reject(error);
};
