import {
  ApplicationModule,
  ApplicationModules,
  ApplicationModulesDictionary,
  NavigationContext,
  NavigationContextProviderFactory
} from 'domain-shared';
import { FC, PropsWithChildren, useCallback, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const modules: ApplicationModule[] = [
  {
    id: ApplicationModules.MODULE_ONE,
    displayName: 'Module One',
    svgIcon: 'module-one',
    routePath: 'module-one'
  },
  {
    id: ApplicationModules.MODULE_TWO,
    displayName: 'Module Two',
    svgIcon: 'module-two',
    routePath: 'module-two'
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

    const navigateToModuleOne = useCallback(() => {
      navigateToModule(ApplicationModules.MODULE_ONE);
    }, [navigateToModule]);

    const navigateToModuleTwo = useCallback(() => {
      navigateToModule(ApplicationModules.MODULE_TWO);
    }, [navigateToModule]);

    const value = useMemo<NavigationContext>(
      () => ({
        modules,
        currentModule,
        getModule,
        navigateToModule,
        navigateToModuleOne,
        navigateToModuleTwo
      }),
      [currentModule, getModule, navigateToModuleTwo, navigateToModuleOne, navigateToModule]
    );

    return <navigationContext.Provider value={value}>{children}</navigationContext.Provider>;
  };

  return NavigationContextProvider;
};
