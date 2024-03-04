import { vi } from 'vitest';
import * as ModuleOneModuleContextModule from '..'; // Import has to be like this because of import in the component which uses ../context
import { ModuleOneModuleContext } from '../models';

export const mockUseModuleOneModuleContext = (mockedContext?: Partial<ModuleOneModuleContext>): void => {
  let userId = 'test-user-id';
  let featureOneName = 'Feature One Test';
  let featureTwoName = 'Feature Two Test';

  let navigateToFeatureOne = () => {};
  let navigateToFeatureTwo = () => {};

  if (mockedContext?.userId) {
    userId = mockedContext.userId;
  }

  if (mockedContext?.featureOneName) {
    featureOneName = mockedContext.featureOneName;
  }

  if (mockedContext?.featureTwoName) {
    featureTwoName = mockedContext.featureTwoName;
  }

  if (mockedContext?.navigateToFeatureOne) {
    navigateToFeatureOne = mockedContext?.navigateToFeatureOne;
  }

  if (mockedContext?.navigateToFeatureTwo) {
    navigateToFeatureTwo = mockedContext?.navigateToFeatureTwo;
  }

  vi.spyOn(ModuleOneModuleContextModule, 'useModuleOneModuleContext').mockReturnValue({
    userId,
    featureOneName,
    featureTwoName,
    navigateToFeatureTwo,
    navigateToFeatureOne
  });
};
