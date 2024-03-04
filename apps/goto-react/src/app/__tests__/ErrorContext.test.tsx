import { ErrorContext } from 'infrastructure-common';
import { renderHook } from '@testing-library/react';
import { FC, PropsWithChildren } from 'react';
import { Context, createContext, useContext } from 'use-context-selector';
import { getErrorContextProviderFactory } from '../ErrorContext';

let ErrContext: Context<ErrorContext | null>;
const useErrorContext = () => useContext(ErrContext) as ErrorContext;

const ErrorContextWrapper: FC<PropsWithChildren> = ({ children }) => {
  ErrContext = createContext<ErrorContext | null>(null);
  const ErrorContextProvider = getErrorContextProviderFactory(ErrContext as Context<ErrorContext>);
  return <ErrorContextProvider>{children}</ErrorContextProvider>;
};

describe('context:ErrorContext', () => {
  it('should render context', () => {
    const { result } = renderHook(() => useErrorContext(), { wrapper: ErrorContextWrapper });

    expect(result.current.onUnexpectedError).toBeInstanceOf(Function);
    expect(result.current.onUserFriendlyError).toBeInstanceOf(Function);
  });
});
