import axios, { AxiosRequestConfig } from "axios";

import { addAuthorizationInterceptor } from "./interceptors/authorization";
import { addErrorInterceptor } from "./interceptors/error";
import { addHeadersInterceptor } from "./interceptors/headers";
import { IAxiosConfig } from "./models/axios-config";
import { Axios } from "./util/axios";

let _axios : Axios;

export const getAxiosInstance = (): Axios => {
  return _axios;
};

export const createAxios = (
  axiosConfig: IAxiosConfig,
  applyConfig?: (config: AxiosRequestConfig
) => void) => {
  const config: AxiosRequestConfig = {
    timeout: 5 * 1000 // 5 seconds
  }

  if (applyConfig) {
    applyConfig(config);
  }

  const axiosInstance = axios.create(config);

  addErrorInterceptor(axiosInstance);
  addAuthorizationInterceptor(axiosInstance, axiosConfig.accessTokenFactory);
  addHeadersInterceptor(axiosInstance, axiosConfig.applicationId);

  _axios = new Axios(axiosInstance);
};