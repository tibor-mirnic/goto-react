import { PropsWithChildren } from 'react';

import { NavigationContextProvider, SecurityContextProvider } from '../../models';

export type SharedServicesProps = PropsWithChildren<{
  navigationContextProvider: NavigationContextProvider;
  securityContextProvider: SecurityContextProvider;
}>;
