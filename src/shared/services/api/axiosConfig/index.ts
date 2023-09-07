import axios, { AxiosInstance } from "axios";

import { errorInterceptor } from "./interceptors/errorInterceptor";
import { responseInterceptor } from "./interceptors/responserInterceptor";

export interface ResponseError {
  message: string;
  error: string;
  errors?: {
    default?: string;
    body?: {
      [field: string]: string;
    };
    params?: {
      [field: string]: string;
    };
    query?: {
      [field: string]: string;
    };
  };
}

const api: AxiosInstance = axios.create({
  baseURL: process.env.APP_URL_SERVER,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => responseInterceptor(response),
  (error) => errorInterceptor(error)
);

export { api };
