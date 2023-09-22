import { renderHook } from '@testing-library/react';
import { vi } from 'vitest';
import { useWithCancelation } from '../use-with-cancelation';

describe('hook:useWithCancelation', () => {
  it('should render hook', () => {
    const { signal } = new AbortController();
    const callback = vi.fn();
    const abort = vi.spyOn(AbortController.prototype, 'abort');

    const { unmount } = renderHook(() => useWithCancelation(callback, []));

    expect(callback).toBeCalledWith(true, signal);
    unmount();
    expect(abort).toBeCalled();
  });
});
