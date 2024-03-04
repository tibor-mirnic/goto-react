import { ApplicationModule } from 'domain-shared';
import { ChangeEventHandler } from 'react';

export type AvailableModulesHook = {
  currentModule: ApplicationModule;
  availableModules: ApplicationModule[];
  onModuleChange: ChangeEventHandler<HTMLSelectElement>;
};
