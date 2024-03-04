import { vi } from 'vitest';
import { X_APPLICATION_ID, X_REQUEST_ID } from '../../models';
import { getHeadersConfig } from '../headers';
import * as UtilModule from '../util';

describe('axios: Headers Interceptor', () => {
  it('should not throw exception', () => {
    expect(() => {
      getHeadersConfig('appId');
    }).not.toThrow();
  });

  it('should return expected result', () => {
    const getUniqueIdMock = vi
      .spyOn(UtilModule, 'getUniqueId')
      .mockImplementation(() => 'bc4456d4-5b6b-459c-b179-3551007a4a7c');
    const returnValue = getHeadersConfig('appId');

    expect(getUniqueIdMock).toHaveBeenCalledTimes(1);
    expect(returnValue).toEqual({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      Expires: '-1',
      [X_APPLICATION_ID]: 'appId',
      [X_REQUEST_ID]: 'bc4456d4-5b6b-459c-b179-3551007a4a7c'
    });
  });
});
