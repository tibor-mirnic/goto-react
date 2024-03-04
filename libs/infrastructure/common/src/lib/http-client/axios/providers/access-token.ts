import { RetrieveAccessToken } from './models';

let ACCESS_TOKEN: RetrieveAccessToken;

export const set = (factory: RetrieveAccessToken) => {
  ACCESS_TOKEN = factory;
};

export const get = () => ACCESS_TOKEN;
