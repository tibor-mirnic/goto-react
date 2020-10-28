import { AxiosInstance, AxiosResponse } from "axios";

import { ErrorBase } from "src/common/errors";
import { getAxiosInstance } from "../axios-instance";
import { AuthenticationError, ConnectionError } from "../models/errors/auth";
import { AUTHORIZATION, SKIP_AUTHORIZATION } from "../models/http-headers";
import { Axios } from "../util/axios";

export const addAuthorizationInterceptor = (axios: AxiosInstance, accessTokenFactory: (axios: Axios) => Promise<string>) => {
  axios.interceptors.request.use(
    async request => {
      try {
        const skipAuthorizationHeader = request.headers && request.headers[SKIP_AUTHORIZATION];
        const skipAuthorization = skipAuthorizationHeader === 'true';

        request.headers = Object
          .keys(request.headers)
          .filter(a => a !== SKIP_AUTHORIZATION)
          .reduce((newHeaders: any, header: string) => {
            newHeaders[header] = request.headers[header];

            return newHeaders;
          }, {});

        if (skipAuthorization) {
          return request;
        }
        
        const axiosInstance = getAxiosInstance();
        const token = await accessTokenFactory(axiosInstance);

        request.headers[AUTHORIZATION] = `Bearer ${token}`;

        return request;
      }
      catch (error) {
        let message = error.message;
        let er: ErrorBase | null = null;
        
        const errorResponse: AxiosResponse = error.response;
        if (errorResponse) {
          message = errorResponse.data;

          /*
            If you receive 400 status code that means that your
            refresh token has expired.
          */
          if (errorResponse.status === 400) {
            er = new AuthenticationError();
          }
        }

        if (!er) {
          er = new ConnectionError();
        }

        return Promise.reject(er);
      }
    }
  )
};