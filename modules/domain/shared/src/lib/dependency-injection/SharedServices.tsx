import { FC } from 'react';
import { Context, createContext, useContextSelector } from 'use-context-selector';
import { NavigationContext, SecurityContext } from '../models';
import { SharedServicesFactory, SharedServicesProps } from './models';

let NavContext: Context<NavigationContext | null>;
let SecContext: Context<SecurityContext | null>;

export const useNavigationContextSelector: <Selected>(selector: (value: NavigationContext) => Selected) => Selected = (
  selector
) => {
  return useContextSelector(NavContext as Context<NavigationContext>, selector);
};

export const useSecurityContextSelector: <Selected>(selector: (value: SecurityContext) => Selected) => Selected = (
  selector
) => {
  return useContextSelector(SecContext as Context<SecurityContext>, selector);
};

export const getSharedServicesFactory: SharedServicesFactory = () => {
  NavContext = createContext<NavigationContext | null>(null);
  SecContext = createContext<SecurityContext | null>(null);

  const SharedServices: FC<SharedServicesProps> = ({
    navigationContextProvider: NavigationContextProvider,
    securityContextProvider: SecurityContextProvider,
    children
  }) => {
    return (
      <NavigationContextProvider>
        <SecurityContextProvider>{children}</SecurityContextProvider>
      </NavigationContextProvider>
    );
  };

  return {
    NavigationContext: NavContext as Context<NavigationContext>,
    SecurityContext: SecContext as Context<SecurityContext>,
    SharedServices
  };
};
