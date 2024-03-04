import { useNavigationContextSelector } from 'domain/shared';
import { ChangeEventHandler, useCallback } from 'react';
import { AvailableModulesHook } from '../models';

export const useAvailableModules = (): AvailableModulesHook => {
  const modules = useNavigationContextSelector((a) => a.modules);
  const currentModule = useNavigationContextSelector((a) => a.currentModule);
  const navigateToModule = useNavigationContextSelector((a) => a.navigateToModule);

  const onModuleChange: ChangeEventHandler<HTMLSelectElement> = useCallback(
    (event) => {
      const moduleId = event.currentTarget.value;
      navigateToModule(moduleId);
    },
    [navigateToModule]
  );

  return {
    currentModule,
    availableModules: modules,
    onModuleChange
  };
};
