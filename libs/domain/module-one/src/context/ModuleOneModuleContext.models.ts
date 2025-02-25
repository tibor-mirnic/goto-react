import { PropsWithChildren } from 'react';

export type ModuleOneModuleContext = {
  userId: string;
  featureOneName: string;
  featureTwoName: string;
  navigateToFeatureOne: () => void;
  navigateToFeatureTwo: () => void;
};

export type ModuleOneModuleContextProps = PropsWithChildren & ModuleOneModuleContext;
