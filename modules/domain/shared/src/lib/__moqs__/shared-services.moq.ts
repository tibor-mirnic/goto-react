import { getNavigationContextMock, NavigationContextMock } from './navigation.context.moq';
import { getSecurityContextMock, SecurityContextMock } from './security.context.moq';

export type SharedServicesMock = Partial<{
  navigationMock: NavigationContextMock;
  securityMock: SecurityContextMock;
}>;

export const getSharedServicesMock = (mockedServices?: SharedServicesMock) => {
  const mock = {
    navigation: getNavigationContextMock(),
    security: getSecurityContextMock()
  };

  if (mockedServices?.navigationMock) {
    mock.navigation = getNavigationContextMock(mockedServices.navigationMock);
  }

  if (mockedServices?.securityMock) {
    mock.security = getSecurityContextMock(mockedServices.securityMock);
  }

  return mock;
};
