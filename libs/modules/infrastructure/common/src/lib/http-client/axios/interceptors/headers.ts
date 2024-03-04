import { AxiosInstance } from 'axios';
import { getUniqueId } from './util';
import { X_APPLICATION_ID, X_REQUEST_ID } from '../models';

export const getHeadersConfig = (applicationId: string) => ({
  'Content-Type': 'application/json',
  'Cache-Control': 'no-cache',
  Pragma: 'no-cache',
  Expires: '-1',
  [X_APPLICATION_ID]: applicationId,
  [X_REQUEST_ID]: getUniqueId()
});

export const addHeadersInterceptor = (axios: AxiosInstance, applicationId: string) => {
  axios.interceptors.request.use((request) => {
    Object.assign(request.headers, getHeadersConfig(applicationId));
    return request;
  });
};
