import AxiosAsync from "../axios-async";

export interface IHttpAsyncConfig {
  applicationId: string;
  defaultTimeout: number;
  accessTokenFactory: (axiosAsync: AxiosAsync) => Promise<string>;
}
