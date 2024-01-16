import { ModuleOneModule } from '@domain/module-one';
import { ApplicationModules, useNavigationContextSelector } from '@domain/shared';
import { FC, Suspense } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

const getModuleRoute = (routePath: string) => `${routePath}/*`;

export const App: FC = () => {
  const getModule = useNavigationContextSelector((a) => a.getModule);

  const featureOneModule = getModule(ApplicationModules.MODULE_ONE);
  const featureTwoModule = getModule(ApplicationModules.MODULE_TWO);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div>
            <div>LAYOUT</div>
            <Outlet />
          </div> /* <LtLayout /> */
        }
      >
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
