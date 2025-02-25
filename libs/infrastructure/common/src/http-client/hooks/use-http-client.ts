import { useMemo } from 'react';
import { HttpClientProvider, IHttpClient } from '../axios';

export const useHttpClient = (): IHttpClient => {
  const axios = useMemo(() => HttpClientProvider.get(), []);

  return {
    handleError: axios.handleError,
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
  };
};
