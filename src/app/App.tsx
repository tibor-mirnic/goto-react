import { ApplicationModules, useNavigationContextSelector } from '@domain/shared';
import { FC, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const getModuleRoute = (routePath: string) => `${routePath}/*`;

export const App: FC = () => {
  const getModule = useNavigationContextSelector((a) => a.getModule);

  const featureOneModule = getModule(ApplicationModules.FEATURE_ONE);
  const featureTwoModule = getModule(ApplicationModules.FEATURE_TWO);
  return (
    <Routes>
      <Route path="/" element={<div>LAYOUT</div> /* <LtLayout /> */}>
        <Route path="/" element={<Navigate to={featureOneModule.routePath} />} />
        <Route
          path={getModuleRoute(featureTwoModule.routePath)}
          element={
            <Suspense fallback={<div>Loading</div>}>
              <div>FEATURE ONE</div>
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
