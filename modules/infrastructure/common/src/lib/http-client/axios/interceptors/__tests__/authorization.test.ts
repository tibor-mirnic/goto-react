import axios, { AxiosError } from 'axios';
import { vi } from 'vitest';
import { ApplicationError } from '../../../../errors';
import { AccessTokenProvider, HttpClientProvider } from '../../providers';
import { AuthenticationError, AUTHORIZATION, ConnectionError, SKIP_AUTHORIZATION, X_REQUEST_ID } from '../../models';
import { HttpClient } from '../../../http-client';
import { authInterceptor } from '../authorization';

describe('axios: Auth Interceptor', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let headers: any = {};

  beforeAll(() => {
    const httpClientFactory = new HttpClient(axios.create({}));
    HttpClientProvider.set(httpClientFactory);
    headers = {
      [X_REQUEST_ID]: 'uuid'
    };
  });

  it('should not authenticate', async () => {
    const retrieveTokenMock = vi.fn().mockReturnValue('token');
    AccessTokenProvider.set(retrieveTokenMock);

    const request = await authInterceptor({
      headers: {
        ...headers,
        [SKIP_AUTHORIZATION]: 'true'
      }
    });

    expect(request).toEqual({
      headers: {
        [X_REQUEST_ID]: 'uuid'
      }
    });

    expect(retrieveTokenMock).not.toBeCalled();
  });

  it('should authenticate', async () => {
    const retrieveTokenMock = vi.fn().mockReturnValue('token');
    AccessTokenProvider.set(retrieveTokenMock);

    const request = await authInterceptor({ headers });

    expect(request).toEqual({
      headers: {
        ...headers,
        [AUTHORIZATION]: `Bearer token`
      }
    });

    expect(retrieveTokenMock).toBeCalledTimes(1);
  });

  it('should throw Error', async () => {
    const message = 'Code execution failed';
    const tokenFactory = vi.fn().mockImplementation(async () => {
      throw new Error(message);
    });
    AccessTokenProvider.set(tokenFactory);

    let e;
    try {
      await authInterceptor({ headers });
    } catch (error) {
      e = error;
    }

    expect(e).toEqual(new ApplicationError(message));
  });

  it('should throw AuthenticationError', async () => {
    const tokenFactory = vi.fn().mockImplementation(async () => {
      throw new AxiosError('', '', undefined, undefined, {
        data: {},
        status: 400,
        statusText: '',
        headers,
        config: {
          headers
        }
      });
    });
    AccessTokenProvider.set(tokenFactory);

    let e;
    try {
      await authInterceptor({ headers });
    } catch (error) {
      e = error;
    }

    expect(e).toEqual(new AuthenticationError());
  });

  it('should throw ConnectionError', async () => {
    const tokenFactory = vi.fn().mockImplementation(async () => {
      throw new AxiosError('', '', undefined, undefined, {
        data: {},
        status: 503,
        statusText: '',
        headers,
        config: {
          headers
        }
      });
    });
    AccessTokenProvider.set(tokenFactory);

    let e;
    try {
      await authInterceptor({ headers });
    } catch (error) {
      e = error;
    }

    expect(e).toEqual(new ConnectionError());
  });
});
