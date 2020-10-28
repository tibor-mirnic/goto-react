import { CancelToken } from "axios";

import { useEffect, useMemo, useState } from "react";

import { getAxiosInstance } from "../axios-instance";
import { IAxios } from "../models/axios";

interface IAxiosHook extends Omit<IAxios, 'getCancelationSource'> {};

export const useWithCancelation = (
  callback: (mounted: boolean, cancelationToken: CancelToken) => void,
  deps: any[] = []) => {
  const axios = useMemo(() => getAxiosInstance(), []);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const source = axios.getCancelationSource();
    
    callback(mounted, source.token);
    
    return () => {
      setMounted(false);
      source.cancel();
    };
  }, deps);
}

export const useAxios = (): IAxiosHook => {
  const axios = useMemo(() => getAxiosInstance(), []);

  return {
    handleError: axios.handleError.bind(axios),
    download: axios.download.bind(axios),
    downloadImage: axios.downloadImage.bind(axios),
    get: axios.get.bind(axios),
    post: axios.post.bind(axios),
    put: axios.put.bind(axios),
    delete: axios.delete.bind(axios)
  }
};