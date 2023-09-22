import axios, { AxiosRequestConfig } from 'axios';

import { addAuthorizationInterceptor, addErrorInterceptor, addHeadersInterceptor } from './interceptors';
import { CreateAxios } from './models';

export const createAxios: CreateAxios = (axiosConfig, applyConfig) => {
  const config: AxiosRequestConfig = {
    // TODO move this to ENV
    timeout: 5 * 1000 // 5 seconds
  };

  if (applyConfig) {
    applyConfig(config);
  }

  const instance = axios.create(config);

  addErrorInterceptor(instance);
  addAuthorizationInterceptor(instance);
  addHeadersInterceptor(instance, axiosConfig.applicationId);

  return instance;
};
