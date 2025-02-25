import { lazy } from 'react';

export const ModuleOneModule = lazy(() =>
  import('./pages/ModuleOneController').then((module) => ({ default: module.ModuleOneController }))
);
