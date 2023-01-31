import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import Storage from 'utils/Storage';
import { BaseResponse } from 'utils/http/response';

// Set config defaults when creating the instance
export const authAxios = axios.create({
  baseURL: process.env.REACT_APP_BASEURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
authAxios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = Storage.getFieldOfUser('token');
    if (!token) return config;

    if (token && config.headers) {
      // config.headers['Authorization'] = 'Bearer ' + token;
      if (['/v1/register', '/v1/login', '/v1/tele/checklinktelegram', '/v1/tele-link'].includes(config?.url as string))
        return config;

      config.headers['token'] = token;
    }

    return config;
  },
  error => {
    Promise.reject(error);
  },
);

// Add a response interceptor
authAxios.interceptors.response.use(
  async (res: AxiosResponse) => {
    const originalConfig = res.config;
    const originalData = res.data as BaseResponse;

    if (
      !['/v1/register', '/v1/login', '/v1/logout', '/v1/tele/checklinktelegram', '/v1/tele-link'].includes(
        originalConfig?.url as string,
      ) &&
      originalData.error === 2 &&
      originalData.message === 'unauthorized'
    ) {
      console.log('re-unauthorized');
      Storage.remove('persist:state');
      window.location.reload();
    }
    return res;
  },
  function (error: AxiosError) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);
