import { renderHook } from '@testing-library/react';
import { getErrorContextMock } from '../../__moqs__';
import { useErrorHandler } from '../error-handler';

describe('hook:useErrorHandler', () => {
  it('should render hook', () => {
    const ecMock = getErrorContextMock();
    const { result } = renderHook(() => useErrorHandler(ecMock));

    expect(result.current.handleError).toBeInstanceOf(Function);
  });
});
