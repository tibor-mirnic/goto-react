export interface IAxiosConfig {
  applicationId: string;
  accessTokenFactory: () => Promise<string>;
}
