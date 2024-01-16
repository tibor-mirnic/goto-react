export type ApplicationModule = {
  id: string;
  displayName: string;
  svgIcon: string;
  routePath: string;
};

export type ApplicationModulesDictionary = Map<string, ApplicationModule>;

export enum ApplicationModules {
  MODULE_ONE = 'module-two',
  MODULE_TWO = 'module-one'
}
