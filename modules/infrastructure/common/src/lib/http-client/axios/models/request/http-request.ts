import { GenericAbortSignal } from 'axios';

import { QueryParams } from './query-params';

export type HttpRequest = {
  resourcePath: string;
  cancelationSignal?: GenericAbortSignal;
  queryParams?: QueryParams;
  skipAuthorization?: boolean;
  timeout?: number;
};

export type HttpPostRequest = HttpRequest & {
  body?: QueryParams;
};
