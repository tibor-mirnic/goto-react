import { FC } from 'react';
import { Context } from 'use-context-selector';
import { NavigationContext, SecurityContext } from '../../models';
import { SharedServicesProps } from './shared-services.props';

export type SharedServicesFactory = () => {
  NavigationContext: Context<NavigationContext>;
  SecurityContext: Context<SecurityContext>;
  SharedServices: FC<SharedServicesProps>;
};
