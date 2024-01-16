import {
  ApplicationModule,
  ApplicationModules,
  ApplicationModulesDictionary,
  NavigationContext,
  NavigationContextProviderFactory
} from '@domain/shared';
import { FC, PropsWithChildren, useCallback, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const modules: ApplicationModule[] = [
  {
    id: ApplicationModules.FEATURE_ONE,
    displayName: 'Feature One',
    svgIcon: 'feature-one',
    routePath: 'feature-one'
  },
  {
    id: ApplicationModules.FEATURE_TWO,
    displayName: 'Feature Two',
    svgIcon: 'feature-two',
    routePath: 'feature-two'
  }
];

const modulesDictionary: ApplicationModulesDictionary = modules.reduce((acc, current) => {
  const found = acc.get(current.id);

  if (!found) {
    acc.set(current.id, { ...current });
  }

  return acc;
}, new Map<string, ApplicationModule>());

export const getNavigationContextProviderFactory: NavigationContextProviderFactory = (navigationContext) => {
  const NavigationContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    let matchedModule: ApplicationModule = modules[0];

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < modules.length; i++) {
      const m = modules[i];

      if (location.pathname.indexOf(m.routePath) !== -1) {
        matchedModule = m;
      }
    }

    const [currentModule, setCurrentModule] = useState<ApplicationModule>(matchedModule);

    const getModule = useCallback((moduleId: string) => {
      return modulesDictionary.get(moduleId) as ApplicationModule;
    }, []);

    const navigateToModule = useCallback(
      (moduleId: string) => {
        const found = getModule(moduleId);

        setCurrentModule({
          ...found
        });
        navigate(found.routePath);
      },
      [getModule, navigate]
    );

    const navigateToFeatureOne = useCallback(() => {
      navigateToModule(ApplicationModules.FEATURE_ONE);
    }, [navigateToModule]);

    const navigateToFeatureTwo = useCallback(() => {
      navigateToModule(ApplicationModules.FEATURE_TWO);
    }, [navigateToModule]);

    const value = useMemo<NavigationContext>(
      () => ({
        modules,
        currentModule,
        getModule,
        navigateToModule,
        navigateToFeatureOne,
        navigateToFeatureTwo
      }),
      [currentModule, getModule, navigateToFeatureTwo, navigateToFeatureOne, navigateToModule]
    );

    return <navigationContext.Provider value={value}>{children}</navigationContext.Provider>;
  };

  return NavigationContextProvider;
};
