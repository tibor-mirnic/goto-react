import { GenericAbortSignal } from 'axios';

export type HttpRequestMethod<Request, Response> = (
  request: Request,
  cancelationSignal?: GenericAbortSignal
) => Promise<Response>;
