/* eslint-disable class-methods-use-this */
import { AxiosInstance, AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';

import { ErrorBase, ErrorType } from '../errors';
import {
  HttpClientProvider,
  createAxios,
  AuthenticationError,
  SKIP_AUTHORIZATION,
  HttpPostRequest,
  HttpRequest,
  IHttpClient
} from './axios';
import { CreateHttpClient } from './models';

export class HttpClient implements IHttpClient {
  constructor(private _axiosInstance: AxiosInstance) {}

  /**
   * Helper for converting the ErrorBase to something more User friendly
   * @param {ErrorBase} error - The error that you want to process
   * @param {(error: ErrorBase) => ErrorBase} transform - A callback function that transforms error
   * @param {Boolean} checkAuthorization - If request is not authorized force AuthenticationError
   * @returns {ErrorBase}
   */
  handleError = (
    error: ErrorBase,
    transform: (error: ErrorBase) => ErrorBase,
    checkAuthorization = false
  ): ErrorBase => {
    if ([ErrorType.AUTHENTICATION, ErrorType.CONNECTION, ErrorType.CONFLICT].includes(error.type)) {
      return error;
    }

    if (error.type === ErrorType.AUTHORIZATION && checkAuthorization) {
      return new AuthenticationError();
    }

    if (error.type === ErrorType.REQUEST_TIMEOUT) {
      const processedError = transform(error);
      processedError.message = `Requested operation timed out. Please, try again.`;

      return processedError;
    }

    return transform(error);
  };

  get = async <T>(request: HttpRequest): Promise<T> => {
    try {
      const reqOpts = this.getRequestOptions(request);
      const response = await this._axiosInstance.get<T>(request.resourcePath, reqOpts);

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  post = async <T>(request: HttpPostRequest): Promise<T> => {
    try {
      const reqOpts = this.getRequestOptions(request);
      const response = await this._axiosInstance.post<T>(request.resourcePath, request.body, reqOpts);

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  put = async <T>(request: HttpPostRequest): Promise<T> => {
    try {
      const reqOpts = this.getRequestOptions(request);
      const response = await this._axiosInstance.put<T>(request.resourcePath, request.body, reqOpts);

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  delete = async <T>(request: HttpRequest): Promise<T> => {
    try {
      const reqOpts = this.getRequestOptions(request);
      const response = await this._axiosInstance.delete<T>(request.resourcePath, reqOpts);

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  private getRequestOptions = (request: HttpRequest): AxiosRequestConfig => {
    const headers: RawAxiosRequestHeaders = {};

    if (request.skipAuthorization) {
      headers[SKIP_AUTHORIZATION] = 'true';
    }

    return {
      headers,
      params: request.queryParams,
      signal: request.cancelationSignal,
      timeout: request.timeout,
      withCredentials: false
    };
  };
}

export const createHttpClient: CreateHttpClient = (axiosConfig, applyConfig) => {
  const instance = createAxios(axiosConfig, applyConfig);
  HttpClientProvider.set(new HttpClient(instance));
};
