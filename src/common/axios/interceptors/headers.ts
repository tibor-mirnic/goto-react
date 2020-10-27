import { AxiosInstance } from "axios";

import { v4 } from "uuid";

import { X_APPLICATION_ID, X_REQUEST_ID } from '../models/http-headers';

export const addHeadersInterceptor = (axios: AxiosInstance, applicationId: string) => {
  axios.interceptors.request.use(
    request => {
      request.headers['Content-Type'] = 'application/json';
      request.headers['Cache-Control'] = 'no-cache';
      request.headers['Pragma'] = 'no-cache';
      request.headers['Expires'] = '-1';
      request.headers[X_APPLICATION_ID] = applicationId;
      request.headers[X_REQUEST_ID] = v4();
  
      return request;
    }
  )
};