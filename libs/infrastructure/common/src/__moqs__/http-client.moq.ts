import { AccessTokenProvider, createHttpClient } from '../http-client';

export const mockHttpClientInstance = () => {
  createHttpClient({
    applicationId: 'id'
  });

  AccessTokenProvider.set(async () => 'token');
};
