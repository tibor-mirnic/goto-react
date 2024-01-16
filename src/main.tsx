import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { createHttpClient, getCommonServicesFactory } from '@infrastructure/common';

import { App, getErrorContextProviderFactory } from './app';

const { CommonServices, ErrorContext } = getCommonServicesFactory();
const ErrorContextProvider = getErrorContextProviderFactory(ErrorContext);

createHttpClient({
  applicationId: `goto-react:${crypto.randomUUID()}`
});

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <BrowserRouter>
      <CommonServices errorContextProvider={ErrorContextProvider}>
        <App />
      </CommonServices>
    </BrowserRouter>
  </StrictMode>
);
