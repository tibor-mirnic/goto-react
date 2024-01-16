import { Context as ReactContext, createContext, FC, useContext, useMemo } from 'react';
import { ModuleOneModuleContext, ModuleOneModuleContextProps } from './models';

const Context = createContext<ModuleOneModuleContext | null>(null);

export const ModuleOneModuleContextProvider: FC<ModuleOneModuleContextProps> = ({
  userId,
  featureOneName,
  navigateToFeatureOne,
  featureTwoName,
  navigateToFeatureTwo,
  children
}) => {
  const value = useMemo<ModuleOneModuleContext>(
    () => ({
      userId,
      featureOneName,
      navigateToFeatureOne,
      featureTwoName,
      navigateToFeatureTwo
    }),
    [featureOneName, featureTwoName, navigateToFeatureOne, navigateToFeatureTwo, userId]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useModuleOneModuleContext = (): ModuleOneModuleContext => {
  return useContext<ModuleOneModuleContext>(Context as ReactContext<ModuleOneModuleContext>);
};
