import { CancelToken } from 'axios';

import { IQueryParams } from '../query-params';

export interface IHttpRequest {
  resourcePath: string;
  queryParams?: IQueryParams;
  skipAuthorization?: boolean;
  timeout?: number;
  cancelationToken?: CancelToken;
}

export interface IHttpPostRequest extends IHttpRequest {
  body?: IQueryParams;
}
