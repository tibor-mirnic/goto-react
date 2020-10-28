import { Axios } from "../util/axios";

export interface IAxiosConfig {
  applicationId: string;
  accessTokenFactory: (axios: Axios) => Promise<string>;
}
