import type { IHttpClient } from '../../models';

export type RetrieveAccessToken = (axios: IHttpClient) => Promise<string>;
