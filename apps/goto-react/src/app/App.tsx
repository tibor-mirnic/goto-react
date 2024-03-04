import { ModuleOneModule } from 'domain-module-one';
import { useAuthorize /* ScUnAuthenticatedPage */ } from 'domain-security';
import { ApplicationModules, useNavigationContextSelector, useSecurityContextSelector } from 'domain-shared';
import { LtLayout } from 'integrations-layout';
import { FC, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const getModuleRoute = (routePath: string) => `${routePath}/*`;

export const App: FC = () => {
  const getModule = useNavigationContextSelector((a) => a.getModule);
  const isAuthenticated = useSecurityContextSelector((a) => a.isAuthenticated);
  const featureOneModule = getModule(ApplicationModules.MODULE_ONE);
  const featureTwoModule = getModule(ApplicationModules.MODULE_TWO);

  useAuthorize(); // Start the authorization process

  // if (!isAuthenticated) {
  //   return <ScUnAuthenticatedPage />;
  // }

  console.log(`Authenticated: ${isAuthenticated}`);

  return (
    <Routes>
      <Route path="/" element={<LtLayout />}>
        <Route path="/" element={<Navigate to={featureOneModule.routePath} />} />
        <Route
          path={getModuleRoute(featureOneModule.routePath)}
          element={
            <Suspense fallback={<div>Loading</div>}>
              <ModuleOneModule userId="id-1" />
            </Suspense>
          }
        />
        <Route
          path={getModuleRoute(featureTwoModule.routePath)}
          element={
            <Suspense fallback={<div>Loading</div>}>
              <div>FEATURE TWO</div>
            </Suspense>
          }
        />
      </Route>
      <Route path="*" element={<div>Page Not Found!</div>} />
    </Routes>
  );
};
