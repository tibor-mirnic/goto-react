import { CancelToken } from "axios";

export type HttpRequestMethod<Request, Response> = (request: Request, cancelationToken?: CancelToken) => Promise<Response>;