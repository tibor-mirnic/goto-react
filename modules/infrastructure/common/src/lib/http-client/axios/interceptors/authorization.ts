import {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios';

import { ApplicationError, ErrorBase } from '../../../errors';

import { AuthenticationError, AUTHORIZATION, ConnectionError, SKIP_AUTHORIZATION } from '../models';
import { AccessTokenProvider, HttpClientProvider } from '../providers';

export const authInterceptor = async (request: InternalAxiosRequestConfig<AxiosRequestConfig>) => {
  try {
    const skipAuthorizationHeader = request.headers && request.headers[SKIP_AUTHORIZATION];
    const skipAuthorization = skipAuthorizationHeader === 'true';

    request.headers = Object.keys(request.headers)
      .filter((a) => a !== SKIP_AUTHORIZATION)
      .reduce((newHeaders, header: string) => {
        // eslint-disable-next-line no-param-reassign
        newHeaders[header] = request.headers[header];

        return newHeaders;
      }, {} as AxiosRequestHeaders);

    if (skipAuthorization) {
      return request;
    }

    const tokenFactory = AccessTokenProvider.get();
    const httpClientFactory = HttpClientProvider.get();
    const token = await tokenFactory(httpClientFactory);

    request.headers[AUTHORIZATION] = `Bearer ${token}`;

    return request;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    let er: ErrorBase | null = null;

    if (error?.isAxiosError) {
      const errorResponse: AxiosResponse = error.response;

      if (errorResponse) {
        // If we receive 400 status code that means that refresh token has expired.
        if (errorResponse.status === 400) {
          er = new AuthenticationError();
        }
      }

      if (!er) {
        er = new ConnectionError();
      }
    } else {
      er = new ApplicationError(error.message);
    }

    return Promise.reject(er);
  }
};

export const addAuthorizationInterceptor = (axios: AxiosInstance) => {
  axios.interceptors.request.use((request) => {
    return authInterceptor(request);
  });
};
