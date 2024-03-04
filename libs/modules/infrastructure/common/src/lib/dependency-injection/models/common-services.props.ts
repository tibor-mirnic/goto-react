import { PropsWithChildren } from 'react';
import { ErrorContextProvider } from '../../errors';

export type CommonServicesProps = PropsWithChildren<{
  errorContextProvider: ErrorContextProvider;
}>;
