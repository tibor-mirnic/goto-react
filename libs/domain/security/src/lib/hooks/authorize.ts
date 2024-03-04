import { useCallback, useEffect } from 'react';

import { AccessTokenProvider } from 'infrastructure/common';
import { useSecurityContextSelector } from 'domain/shared';

/**
 * Start the authentication process, either trough external lib
 * or api call
 */
export const useAuthorize = () => {
  const updateToken = useSecurityContextSelector((a) => a.updateToken);

  const getAccessToken = useCallback(async () => {
    let idToken = '';

    try {
      const response = await Promise.resolve('authorized');

      updateToken(response);

      idToken = response;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }

    return idToken;
  }, [updateToken]);

  useEffect(() => {
    // Simulate login process, will run only once
    getAccessToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // GetToken will be called on every axios request
    AccessTokenProvider.set(getAccessToken);
  }, [getAccessToken]);
};
