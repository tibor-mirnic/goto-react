import { useMemo } from "react";
import { AxiosRequestConfig } from 'axios';

import { ErrorBase, ErrorType } from "src/common/errors";

import { getAxiosInstance } from "../axios-instance";
import { AuthenticationError } from "../models/errors/auth";
import { SKIP_AUTHORIZATION } from "../models/http-headers";
import { IHttpPostRequest, IHttpRequest } from "../models/request/http-request";
import { IAxiosHook } from "../models/hooks/axios";

export const useAxios = (): IAxiosHook => {
  const axiosInstance = useMemo(() => getAxiosInstance(), []);

  const getRequestOptions = (request: IHttpRequest): AxiosRequestConfig => {
    const headers: any = {};

    if (request.skipAuthorization) {
      headers[SKIP_AUTHORIZATION] = 'true';
    }

    return {
      headers,
      params: request.queryParams,
      timeout: request.timeout,
      withCredentials: true
    };
  };

  const handleError = (
    error: ErrorBase,
    processError: (error: ErrorBase) => ErrorBase,
    checkAuthorization = false): ErrorBase => {
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

  const download = async (request: IHttpRequest): Promise<ArrayBuffer> => {
    try {
      const reqOpts = getRequestOptions(request);
      reqOpts.responseType = 'arraybuffer';
      const response = await axiosInstance.get<ArrayBuffer>(request.resourcePath, reqOpts);

      return response.data;
    }
    catch (error) {
      throw error;
    }
  }

  const downloadImage = async (request: IHttpRequest): Promise<Blob> => {
    try {
      const reqOpts = getRequestOptions(request);
      reqOpts.responseType = 'blob';
      const response = await axiosInstance.get<Blob>(request.resourcePath, reqOpts);

      return response.data;
    }
    catch (error) {
      throw error;
    }
  }

  const get = async <T>(request: IHttpRequest): Promise<T> => {
    try {
      const reqOpts = getRequestOptions(request);
      const response = await axiosInstance.get<T>(request.resourcePath, reqOpts);

      return response.data;
    }
    catch (error) {
      throw error;
    }
  };

  const post = async <T>(request: IHttpPostRequest): Promise<T> => {
    try {
      const reqOpts = getRequestOptions(request);
      const response = await axiosInstance.post<T>(request.resourcePath, request.body, reqOpts);

      return response.data;
    }
    catch (error) {
      throw error;
    }
  };

  const put = async <T>(request: IHttpPostRequest): Promise<T> => {
    try {
      const reqOpts = getRequestOptions(request);
      const response = await axiosInstance.put<T>(request.resourcePath, request.body, reqOpts);

      return response.data;
    }
    catch (error) {
      throw error;
    }
  };

  const remove = async <T>(request: IHttpRequest): Promise<T> => {
    try {
      const reqOpts = getRequestOptions(request);
      const response = await axiosInstance.delete<T>(request.resourcePath, reqOpts);

      return response.data;
    }
    catch (error) {
      throw error;
    }
  }

  return {
    handleError,
    download,
    downloadImage,
    get,
    post,
    put,
    delete: remove
  }
};