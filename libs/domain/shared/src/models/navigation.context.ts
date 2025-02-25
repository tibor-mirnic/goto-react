import { FC, PropsWithChildren } from 'react';
import { Context } from 'use-context-selector';
import { ApplicationModule } from './application-module';

export type NavigationContext = {
  modules: ApplicationModule[];
  currentModule: ApplicationModule;
  getModule: (moduleId: string) => ApplicationModule;
  navigateToModule: (moduleId: string) => void;
  navigateToModuleOne: () => void;
  navigateToModuleTwo: () => void;
};

export type NavigationContextProvider = FC<PropsWithChildren>;

export type NavigationContextProviderFactory = (
  navigationContext: Context<NavigationContext>
) => NavigationContextProvider;
