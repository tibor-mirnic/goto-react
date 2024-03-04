import * as SharedModule from 'domain/shared';
import { getSharedServicesMock, SharedServicesMock } from 'domain/shared/moq';
import { vi } from 'vitest';

export const mockSharedServices = (mockedServices?: SharedServicesMock) => {
  const sharedServicesMock = getSharedServicesMock(mockedServices);
  vi.spyOn(SharedModule, 'useNavigationContextSelector').mockImplementation((selector) =>
    selector(sharedServicesMock.navigation)
  );
  vi.spyOn(SharedModule, 'useSecurityContextSelector').mockImplementation((selector) =>
    selector(sharedServicesMock.security)
  );
};
