import { FC } from 'react';
import { Context, createContext, useContext, useContextSelector } from 'use-context-selector';
import { ErrorContext, useErrorHandlerPrivate } from '../errors';
import { HandleErrorMethod } from '../errors/hooks/models';
import { CommonServicesFactory, CommonServicesProps } from './models';

let ErrContext: Context<ErrorContext | null>;

export const useErrorContextSelector: <Selected>(selector: (value: ErrorContext) => Selected) => Selected = (
  selector
) => {
  return useContextSelector(ErrContext as Context<ErrorContext>, selector);
};

export const useErrorHandler = (): HandleErrorMethod => {
  const errCtx = useContext(ErrContext) as ErrorContext;
  const { handleError } = useErrorHandlerPrivate(errCtx);

  return handleError;
};

export const getCommonServicesFactory: CommonServicesFactory = () => {
  ErrContext = createContext<ErrorContext | null>(null);

  const CommonServices: FC<CommonServicesProps> = ({ errorContextProvider: ErrorContextProvider, children }) => {
    return <ErrorContextProvider>{children}</ErrorContextProvider>;
  };

  return {
    ErrorContext: ErrContext as Context<ErrorContext>,
    CommonServices
  };
};
