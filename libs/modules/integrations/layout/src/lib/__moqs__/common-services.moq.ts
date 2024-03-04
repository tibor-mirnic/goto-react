import * as CommonModule from 'infrastructure-common';
import { CommonServicesMock, getCommonServicesMock } from '@infrastructure/common-moq';
import { vi } from 'vitest';

export const mockCommonServices = (mockedServices?: CommonServicesMock) => {
  const commonServicesMock = getCommonServicesMock(mockedServices);
  vi.spyOn(CommonModule, 'useErrorHandler').mockImplementation(() => commonServicesMock.handleError);
};
