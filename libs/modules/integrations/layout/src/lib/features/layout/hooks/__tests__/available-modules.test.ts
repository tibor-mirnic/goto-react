import { renderHook } from '@testing-library/react';
import { mockSharedServices } from '../../../../__moqs__';
import { useAvailableModules } from '../available-modules';

describe('hook:useAvailableModules', () => {
  beforeEach(() => {
    mockSharedServices();
  });

  it('should return expected response', () => {
    const { result } = renderHook(() => useAvailableModules());

    expect(result.current.currentModule).toEqual(
      expect.objectContaining({
        id: 'test-module-one'
      })
    );
    expect(result.current.availableModules).toHaveLength(2);
    expect(result.current.onModuleChange).toBeInstanceOf(Function);
  });
});
