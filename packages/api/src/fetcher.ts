import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

const API_URL = 'https://jampot.co.kr/';

export const instance: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  return config;
});

instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: any) => {
    console.error(
      '[Axios Error]',
      error.response?.status,
      error.response?.data
    );
    return Promise.reject(error);
  }
);

export async function resultify<T>(response: AxiosResponse): Promise<T> {
  try {
    return response.data as T;
  } catch (e) {
    console.error('[fetcher.ts] resultify에서 오류 생김');
    throw e;
  }
}

export const fetcher = {
  get: async <T>(pathname: string, options?: AxiosRequestConfig) =>
    resultify<T>(await instance.get(pathname, options)),
  post: async <T>(pathname: string, data?: any, options?: AxiosRequestConfig) =>
    resultify<T>(await instance.post(pathname, data, options)),
  put: async <T>(pathname: string, data?: any, options?: AxiosRequestConfig) =>
    resultify<T>(await instance.put(pathname, data, options)),
  delete: async <T>(pathname: string, options?: AxiosRequestConfig) =>
    resultify<T>(await instance.delete(pathname, options)),
};
