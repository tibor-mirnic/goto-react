export type ApplicationModule = {
  id: string;
  displayName: string;
  svgIcon: string;
  routePath: string;
};

export type ApplicationModulesDictionary = Map<string, ApplicationModule>;

export enum ApplicationModules {
  FEATURE_ONE = 'feature-two',
  FEATURE_TWO = 'feature-one'
}
