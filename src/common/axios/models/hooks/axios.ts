import { ErrorBase } from "src/common/errors";

import { IHttpPostRequest, IHttpRequest } from "../request/http-request";

export interface IAxiosHook {
  handleError(
    error: ErrorBase,
    processError: (error: ErrorBase) => ErrorBase,
    checkAuthorization: boolean): ErrorBase;

  download(request: IHttpRequest): Promise<ArrayBuffer>;
  downloadImage(request: IHttpRequest): Promise<Blob>;
  
  get<T>(request: IHttpRequest): Promise<T>;
  post<T>(request: IHttpPostRequest): Promise<T>;
  put<T>(request: IHttpPostRequest): Promise<T>;
  delete<T>(request: IHttpRequest): Promise<T>;
}