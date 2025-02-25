import { FC } from 'react';
import { Context } from 'use-context-selector';
import { ErrorContext } from '../../errors';
import { CommonServicesProps } from './common-services.props';

export type CommonServicesFactory = () => {
  ErrorContext: Context<ErrorContext>;
  CommonServices: FC<CommonServicesProps>;
};
