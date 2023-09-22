import { ErrorBase } from '../../../errors';
import { HttpPostRequest, HttpRequest } from './request';

export interface IHttpClient {
  handleError(error: ErrorBase, processError: (error: ErrorBase) => ErrorBase, checkAuthorization?: boolean): ErrorBase;

  get<T>(request: HttpRequest): Promise<T>;
  post<T>(request: HttpPostRequest): Promise<T>;
  put<T>(request: HttpPostRequest): Promise<T>;
  delete<T>(request: HttpRequest): Promise<T>;
}
