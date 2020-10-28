import axios, { AxiosInstance, AxiosRequestConfig, CancelTokenSource } from "axios";

import { ErrorBase, ErrorType } from "src/common/errors";
import { IAxios } from "../models/axios";
import { AuthenticationError } from "../models/errors/auth";
import { SKIP_AUTHORIZATION } from "../models/http-headers";
import { IHttpPostRequest, IHttpRequest } from "../models/request/http-request";

export class Axios implements IAxios {

  constructor(
    private _axiosInstance: AxiosInstance
  ) {}

  getCancelationSource(): CancelTokenSource {
    return axios.CancelToken.source();
  }

  handleError (
    error: ErrorBase,
    processError: (error: ErrorBase) => ErrorBase,
    checkAuthorization = false): ErrorBase {
    if (error.type === ErrorType.AUTHENTICATION
      || error.type === ErrorType.CONNECTION
      || error.type === ErrorType.CONFLICT) {
      return error;
    }

    if (error.type === ErrorType.AUTHORIZATION && checkAuthorization) {
      return new AuthenticationError();
    }

    if (error.type === ErrorType.REQUEST_TIMEOOUT) {
      const processedError = processError(error);
      processedError.message = `Requested operation timed out. Please, try again.`;

      return processedError;
    }

    return processError(error);
  };

  async download(request: IHttpRequest): Promise<ArrayBuffer> {
    try {
      const reqOpts = this.getRequestOptions(request);
      reqOpts.responseType = 'arraybuffer';
      const response = await this._axiosInstance.get<ArrayBuffer>(request.resourcePath, reqOpts);

      return response.data;
    }
    catch (error) {
      throw error;
    }
  }

  async downloadImage(request: IHttpRequest): Promise<Blob> {
    try {
      const reqOpts = this.getRequestOptions(request);
      reqOpts.responseType = 'blob';
      const response = await this._axiosInstance.get<Blob>(request.resourcePath, reqOpts);

      return response.data;
    }
    catch (error) {
      throw error;
    }
  }

  async get<T>(request: IHttpRequest): Promise<T> {
    try {
      const reqOpts = this.getRequestOptions(request);
      const response = await this._axiosInstance.get<T>(request.resourcePath, reqOpts);

      return response.data;
    }
    catch (error) {
      throw error;
    }
  };

  async post<T>(request: IHttpPostRequest): Promise<T> {
    try {
      const reqOpts = this.getRequestOptions(request);
      const response = await this._axiosInstance.post<T>(request.resourcePath, request.body, reqOpts);

      return response.data;
    }
    catch (error) {
      throw error;
    }
  };

  async put<T>(request: IHttpPostRequest): Promise<T> {
    try {
      const reqOpts = this.getRequestOptions(request);
      const response = await this._axiosInstance.put<T>(request.resourcePath, request.body, reqOpts);

      return response.data;
    }
    catch (error) {
      throw error;
    }
  };

  async delete<T>(request: IHttpRequest): Promise<T> {
    try {
      const reqOpts = this.getRequestOptions(request);
      const response = await this._axiosInstance.delete<T>(request.resourcePath, reqOpts);

      return response.data;
    }
    catch (error) {
      throw error;
    }
  }

  private getRequestOptions(request: IHttpRequest): AxiosRequestConfig {
    const headers: any = {};

    if (request.skipAuthorization) {
      headers[SKIP_AUTHORIZATION] = 'true';
    }

    return {
      headers,
      params: request.queryParams,
      timeout: request.timeout,
      withCredentials: true,
      cancelToken: request.cancelationToken
    };
  };
}