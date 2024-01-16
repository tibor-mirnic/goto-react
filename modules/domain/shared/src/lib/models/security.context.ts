import { FC, PropsWithChildren } from 'react';
import { Context } from 'use-context-selector';
import { User } from './user';

export type SecurityContext = {
  getUser: () => User;
  // permissions
  hasAnyPermission: (permissions: string[]) => boolean;
  hasAnyRole: (roles: string[]) => boolean;
  hasEveryPermission: (permissions: string[]) => boolean;
  hasEveryRole: (roles: string[]) => boolean;
  // authorization
  logout: () => void;
};

export type SecurityContextProvider = FC<PropsWithChildren>;

export type SecurityContextProviderFactory = (securityContext: Context<SecurityContext>) => SecurityContextProvider;
