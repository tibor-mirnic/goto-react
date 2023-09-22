import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { ApplicationError, ErrorBase } from '../../../errors';
import {
  AuthorizationError,
  BadRequestError,
  ConflictError,
  ConnectionError,
  ForbiddenError,
  GatewayTimeoutError,
  InternalServerError,
  NotFoundError,
  RequestTimeoutError
} from '../models';

export const onRejected = (error: AxiosError) => {
  if (error instanceof ErrorBase) {
    return Promise.reject(error);
  }

  let { message } = error;
  let er: ErrorBase | null = null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const errorResponse: AxiosResponse<any, any> | undefined = error.response;

  if (errorResponse) {
    message = errorResponse.data;

    switch (errorResponse.status) {
      case 400: {
        er = new BadRequestError(message);
        break;
      }
      case 401: {
        er = new AuthorizationError(message);
        break;
      }
      case 403: {
        er = new ForbiddenError(message);
        break;
      }
      case 404: {
        er = new NotFoundError(message);
        break;
      }
      case 408: {
        er = new RequestTimeoutError(message);
        break;
      }
      case 409: {
        er = new ConflictError(message);
        break;
      }
      case 500: {
        er = new InternalServerError(message);
        break;
      }
      case 503: {
        er = new ConnectionError(message);
        break;
      }
      case 504: {
        er = new GatewayTimeoutError(message);
        break;
      }
      default: {
        break;
      }
    }

    if (error?.name?.toLowerCase() === 'TimeoutError'.toLowerCase()) {
      er = new RequestTimeoutError(message);
    }

    if (!er) {
      er = new ApplicationError(error.message);
    }
  }

  return Promise.reject(er);
};

export const addErrorInterceptor = (axios: AxiosInstance): void => {
  axios.interceptors.response.use((response) => {
    // We do not handle 200 error codes
    return response;
  }, onRejected);
};
