import { ErrorBase, ErrorContext, ErrorContextProviderFactory } from 'infrastructure-common';

import { FC, PropsWithChildren, useCallback, useMemo } from 'react';

export const getErrorContextProviderFactory: ErrorContextProviderFactory = (errorContext) => {
  const ErrorContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const onUnexpectedError = useCallback(() => {}, []);
    const onUserFriendlyError = useCallback((errorBase: ErrorBase) => {
      // eslint-disable-next-line no-alert
      alert(`${errorBase.name}: ${errorBase.message}`);
    }, []);

    const value = useMemo<ErrorContext>(
      () => ({
        onUnexpectedError,
        onUserFriendlyError
      }),
      [onUnexpectedError, onUserFriendlyError]
    );

    return <errorContext.Provider value={value}>{children}</errorContext.Provider>;
  };

  return ErrorContextProvider;
};
