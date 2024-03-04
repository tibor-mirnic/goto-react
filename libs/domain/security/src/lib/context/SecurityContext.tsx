import { SecurityContext, SecurityContextProviderFactory } from 'domain/shared';
import { FC, PropsWithChildren, useCallback, useMemo, useState } from 'react';

export const getSecurityContextProviderFactory: SecurityContextProviderFactory = (securityContext) => {
  const SecurityContextProvider: FC<PropsWithChildren> = ({ children }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [roles, setRoles] = useState<Map<string, boolean>>(new Map()); // Map<RoleName, boolean>
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [permissions, setPermissions] = useState<Map<string, string>>(new Map()); // Map<PermissionName, RoleName>
    const [token, setToken] = useState<string | undefined>();

    const updateToken = useCallback((tokenLocal: string) => setToken(tokenLocal), []);
    const getToken = useCallback(() => token!, [token]);

    const hasEveryRole = useCallback(
      (rolesLocal: string[]) => rolesLocal.every((role: string) => roles.has(role)),
      [roles]
    );

    const hasAnyRole = useCallback(
      (rolesLocal: string[]) => rolesLocal.some((role: string) => roles.has(role)),
      [roles]
    );

    const hasEveryPermission = useCallback(
      (permissionsLocal: string[]) => permissionsLocal.every((perm: string) => permissions.has(perm)),
      [permissions]
    );

    const hasAnyPermission = useCallback(
      (permissionsLocal: string[]) => permissionsLocal.some((perm: string) => permissions.has(perm)),
      [permissions]
    );

    const logout = useCallback(() => {
      // eslint-disable-next-line no-alert
      setToken(undefined);
    }, []);

    const getUser = useCallback(() => {
      return {
        displayName: 'GoTo React',
        id: 'goto-react-id'
      };
    }, []);

    const isAuthenticated = useMemo(() => !!token, [token]);

    const value = useMemo<SecurityContext>(() => {
      return {
        hasAnyPermission,
        hasAnyRole,
        hasEveryPermission,
        hasEveryRole,
        logout,
        getUser,
        getToken,
        updateToken,
        isAuthenticated
      };
    }, [
      getToken,
      getUser,
      hasAnyPermission,
      hasAnyRole,
      hasEveryPermission,
      hasEveryRole,
      isAuthenticated,
      logout,
      updateToken
    ]);

    return <securityContext.Provider value={value}>{children}</securityContext.Provider>;
  };

  return SecurityContextProvider;
};
