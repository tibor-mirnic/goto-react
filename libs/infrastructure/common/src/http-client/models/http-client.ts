import { ApplyAxiosConfig, AxiosConfig } from '../axios';

export type CreateHttpClient = (axiosConfig: AxiosConfig, applyConfig?: ApplyAxiosConfig) => void;
