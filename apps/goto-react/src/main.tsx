import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { getSharedServicesFactory } from 'domain/shared';
import { createHttpClient, getCommonServicesFactory } from 'infrastructure/common';

import { getSecurityContextProviderFactory } from 'domain/security';
import { App, getErrorContextProviderFactory, getNavigationContextProviderFactory } from './app';

const { CommonServices, ErrorContext } = getCommonServicesFactory();
const ErrorContextProvider = getErrorContextProviderFactory(ErrorContext);

const { SharedServices, NavigationContext, SecurityContext } = getSharedServicesFactory();
const NavigationContextProvider = getNavigationContextProviderFactory(NavigationContext);
const SecurityContextProvider = getSecurityContextProviderFactory(SecurityContext);

createHttpClient({
  applicationId: `goto-react:${crypto.randomUUID()}`
});

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <BrowserRouter>
      <CommonServices errorContextProvider={ErrorContextProvider}>
        <SharedServices
          navigationContextProvider={NavigationContextProvider}
          securityContextProvider={SecurityContextProvider}
        >
          <App />
        </SharedServices>
      </CommonServices>
    </BrowserRouter>
  </StrictMode>
);
