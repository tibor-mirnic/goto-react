import { AxiosInstance, AxiosResponse } from "axios";

import { ErrorBase, ApplicationError } from "src/common/errors";

import { AuthorizationError, ConnectionError } from "../models/errors/auth";
import { BadRequestError } from "../models/errors/bad-request";
import { ConflictError } from "../models/errors/conflict";
import { ForbiddenError } from "../models/errors/forbidden";
import { InternalServerError } from "../models/errors/internal-server";
import { NotFoundError } from "../models/errors/not-found";
import { RequestTimeoutError, GatewayTimeoutError } from "../models/errors/request-timeout";

export const addErrorInterceptor = (axios: AxiosInstance): void => {
  axios.interceptors.response.use(
    response => {
      // We do not handle 200 error codes
      return response;
    },
    error => {
      if (error instanceof ErrorBase) {
        return Promise.reject(error);
      }

      let message = error.message;
      let er: ErrorBase | null = null;
      
      const errorResponse: AxiosResponse = error.response;
      if (errorResponse) {
        message = errorResponse.data;

        if (errorResponse.status === 400) {
          er = new BadRequestError(message);
        }

        if (errorResponse.status === 401) {
          er = new AuthorizationError(message);
        }

        if (errorResponse.status === 403) {
          er = new ForbiddenError(message);
        }

        if (errorResponse.status === 404) {
          er = new NotFoundError(message);
        }

        if (errorResponse.status === 408
          || error.name.toLowerCase() === 'TimeoutError'.toLowerCase()) {
          er = new RequestTimeoutError(message);
        }

        if (errorResponse.status === 409) {
          er = new ConflictError(message);
        }

        if (errorResponse.status === 500) {
          er = new InternalServerError(message);
        }

        if (errorResponse.status === 503) {
          er = new ConnectionError(message);
        }

        if (errorResponse.status === 504) {
          er = new GatewayTimeoutError(message);
        }

        if (!er) {
          er = new ApplicationError(error.message);
        }
      }

      return Promise.reject(er);
    }
  )
};