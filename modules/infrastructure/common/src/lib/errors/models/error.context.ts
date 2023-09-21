import { FC, PropsWithChildren } from 'react';
import { Context } from 'use-context-selector';
import { ErrorBase } from './base';

export type ErrorContext = {
  onUnexpectedError: (error: ErrorBase) => void;
  onUserFriendlyError: (error: ErrorBase) => void;
};

export type ErrorContextProvider = FC<PropsWithChildren>;

export type ErrorContextProviderFactory = (errorContext: Context<ErrorContext>) => ErrorContextProvider;
