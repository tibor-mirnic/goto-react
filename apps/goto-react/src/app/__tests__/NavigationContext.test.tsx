import { ApplicationModules, NavigationContext } from 'domain/shared';
import { renderHook, waitFor } from '@testing-library/react';
import { FC } from 'react';
import { MemoryRouter, MemoryRouterProps } from 'react-router-dom';
import { Context, createContext, useContext } from 'use-context-selector';
import { getNavigationContextProviderFactory } from '../NavigationContext';

let NavContext: Context<NavigationContext | null>;
const useNavigationContext = () => useContext(NavContext) as NavigationContext;

const NavigationContextWrapper: FC<MemoryRouterProps> = ({ initialEntries, initialIndex, children }) => {
  NavContext = createContext<NavigationContext | null>(null);
  const NavigationContextProvider = getNavigationContextProviderFactory(NavContext as Context<NavigationContext>);

  return (
    <MemoryRouter initialEntries={initialEntries} initialIndex={initialIndex}>
      <NavigationContextProvider>{children}</NavigationContextProvider>
    </MemoryRouter>
  );
};

describe('context:NavigationContext', () => {
  it(`should render context`, () => {
    const { result } = renderHook(() => useNavigationContext(), {
      wrapper: NavigationContextWrapper
    });

    expect(result.current.currentModule).not.toBeNull();
    expect(result.current.modules).toHaveLength(2);
    expect(result.current.getModule).toBeInstanceOf(Function);
    expect(result.current.navigateToModule).toBeInstanceOf(Function);
    expect(result.current.navigateToModuleOne).toBeInstanceOf(Function);
    expect(result.current.navigateToModuleTwo).toBeInstanceOf(Function);
  });

  it(`should return ${ApplicationModules.MODULE_ONE} as current module`, () => {
    const { result } = renderHook(() => useNavigationContext(), {
      wrapper: NavigationContextWrapper
    });

    expect(result.current.currentModule.id).toEqual(ApplicationModules.MODULE_ONE);
  });

  it(`should return ${ApplicationModules.MODULE_TWO} as current module`, () => {
    const { result } = renderHook(() => useNavigationContext(), {
      wrapper: ({ children }) => (
        <NavigationContextWrapper initialEntries={[`/${ApplicationModules.MODULE_TWO}`]}>
          {children}
        </NavigationContextWrapper>
      )
    });

    expect(result.current.currentModule.id).toEqual(ApplicationModules.MODULE_TWO);
  });

  it(`should navigate to ${ApplicationModules.MODULE_ONE} when navigateToModuleOne is called`, async () => {
    const { result } = renderHook(() => useNavigationContext(), {
      wrapper: ({ children }) => (
        <NavigationContextWrapper initialEntries={[`/${ApplicationModules.MODULE_TWO}`]}>
          {children}
        </NavigationContextWrapper>
      )
    });

    await waitFor(() => {
      result.current.navigateToModuleOne();
    });

    expect(result.current.currentModule.id).toEqual(ApplicationModules.MODULE_ONE);
  });

  it(`should navigate to ${ApplicationModules.MODULE_TWO} when navigateToModuleTwo is called`, async () => {
    const { result } = renderHook(() => useNavigationContext(), {
      wrapper: NavigationContextWrapper
    });

    await waitFor(() => {
      result.current.navigateToModuleTwo();
    });

    expect(result.current.currentModule.id).toEqual(ApplicationModules.MODULE_TWO);
  });

  it(`should navigate to ${ApplicationModules.MODULE_TWO} when navigateToModule(${ApplicationModules.MODULE_TWO}) is called`, async () => {
    const { result } = renderHook(() => useNavigationContext(), {
      wrapper: NavigationContextWrapper
    });

    await waitFor(() => {
      result.current.navigateToModule(ApplicationModules.MODULE_TWO);
    });

    expect(result.current.currentModule.id).toEqual(ApplicationModules.MODULE_TWO);
  });
});
