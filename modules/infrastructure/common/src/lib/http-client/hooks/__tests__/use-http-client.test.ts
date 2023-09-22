import { renderHook } from '@testing-library/react';
import { mockHttpClientInstance } from '../../../__moqs__/index.moq';
import { useHttpClient } from '../use-http-client';

describe('hook:useHttpClient', () => {
  it('should render hook', () => {
    mockHttpClientInstance();

    const { result } = renderHook(() => useHttpClient());

    expect(result.current.handleError).toBeInstanceOf(Function);
    expect(result.current.get).toBeInstanceOf(Function);
    expect(result.current.post).toBeInstanceOf(Function);
    expect(result.current.put).toBeInstanceOf(Function);
    expect(result.current.delete).toBeInstanceOf(Function);
  });
});
