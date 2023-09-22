import { IHttpClient } from '../models';

let HTTP_CLIENT: IHttpClient;

export const set = (client: IHttpClient): void => {
  HTTP_CLIENT = client;
};

export const get = () => HTTP_CLIENT;
