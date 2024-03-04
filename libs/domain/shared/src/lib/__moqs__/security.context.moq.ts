/* eslint-disable @typescript-eslint/no-unused-vars */
import { SecurityContext } from '../models';

export type SecurityContextMock = Partial<SecurityContext>;

export const getSecurityContextMock = (mockedContext?: SecurityContextMock) => {
  let token = '';
  let hasAnyPermission = (permissions: string[]) => false;
  let hasAnyRole = (roles: string[]) => false;
  let hasEveryPermission = (permissions: string[]) => false;
  let hasEveryRole = (roles: string[]) => false;
  let logout = () => {};
  let getUser = () => ({});
  const isAuthenticated = false;
  const getToken = () => token;
  const updateToken = (newToken: string) => {
    token = newToken;
  };

  if (mockedContext?.hasAnyPermission) {
    hasAnyPermission = mockedContext.hasAnyPermission;
  }

  if (mockedContext?.hasAnyRole) {
    hasAnyRole = mockedContext.hasAnyRole;
  }

  if (mockedContext?.hasEveryPermission) {
    hasEveryPermission = mockedContext.hasEveryPermission;
  }

  if (mockedContext?.hasEveryRole) {
    hasEveryRole = mockedContext.hasEveryRole;
  }

  if (mockedContext?.logout) {
    logout = mockedContext.logout;
  }

  if (mockedContext?.getUser) {
    getUser = mockedContext.getUser;
  }

  return {
    hasAnyPermission,
    hasAnyRole,
    hasEveryPermission,
    hasEveryRole,
    getUser,
    logout,
    isAuthenticated,
    updateToken,
    getToken
  };
};
