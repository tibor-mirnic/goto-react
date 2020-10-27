import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

import { addAuthorizationInterceptor } from "./interceptors/authorization";
import { addErrorInterceptor } from "./interceptors/error";
import { addHeadersInterceptor } from "./interceptors/headers";
import { IAxiosConfig } from "./models/axios-config";

let _axiosInstance: AxiosInstance;

export const getAxiosInstance = (): AxiosInstance => {
  return _axiosInstance;
};

export const createAxios = (axiosConfig: IAxiosConfig, applyConfig?: (config: AxiosRequestConfig) => void) => {
  const config: AxiosRequestConfig = {
    timeout: 5 * 1000 // 5 seconds
  }

  if (applyConfig) {
    applyConfig(config);
  }

  _axiosInstance = axios.create(config);

  addErrorInterceptor(_axiosInstance);
  addAuthorizationInterceptor(_axiosInstance, axiosConfig.accessTokenFactory);
  addHeadersInterceptor(_axiosInstance, axiosConfig.applicationId);
};