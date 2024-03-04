/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps */
import { GenericAbortSignal } from 'axios';
import { useEffect, useMemo, useState } from 'react';

import { HttpClientProvider } from '../axios';

export const useWithCancelation = (
  callback: (mounted: boolean, cancelationSignal: GenericAbortSignal) => void,
  deps: any[] = []
) => {
  const httpClient = useMemo(() => HttpClientProvider.get(), []);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();

    callback(mounted, abortController.signal);

    return () => {
      setMounted(false);
      abortController.abort();
    };
  }, [httpClient, callback, mounted, ...deps]);
};
