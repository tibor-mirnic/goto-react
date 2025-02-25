import { AxiosInstance, AxiosRequestConfig } from 'axios';

export type AxiosConfig = {
  applicationId: string;
};

export type ApplyAxiosConfig = (config: AxiosRequestConfig) => void;

export type CreateAxios = (axiosConfig: AxiosConfig, applyConfig?: ApplyAxiosConfig) => AxiosInstance;
