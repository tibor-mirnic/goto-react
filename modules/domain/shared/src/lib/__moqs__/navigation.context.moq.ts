import { ApplicationModule, NavigationContext } from '../models';

export type NavigationContextMock = Partial<Omit<NavigationContext, 'modules' | 'currentModule'>>;

export const getNavigationContextMock = (mockedContext?: NavigationContextMock): NavigationContext => {
  const moduleOne = {
    id: 'test-module-one',
    displayName: 'Test Module One',
    svgIcon: 'test-module-one',
    routePath: 'test-module-one'
  } as ApplicationModule;

  const mock: NavigationContext = {
    modules: [
      {
        ...moduleOne
      },
      {
        id: 'test-module-two',
        displayName: 'Test Module Two',
        svgIcon: 'test-module-two',
        routePath: 'test-module-two'
      }
    ],
    currentModule: {
      ...moduleOne
    },
    getModule: () => moduleOne,
    navigateToFeatureOne: () => {},
    navigateToFeatureTwo: () => {},
    navigateToModule: () => {}
  };

  if (mockedContext?.navigateToFeatureOne) {
    mock.navigateToFeatureOne = mockedContext.navigateToFeatureOne;
  }

  if (mockedContext?.navigateToFeatureTwo) {
    mock.navigateToFeatureTwo = mockedContext.navigateToFeatureTwo;
  }

  if (mockedContext?.navigateToModule) {
    mock.navigateToModule = mockedContext.navigateToModule;
  }

  return mock;
};
