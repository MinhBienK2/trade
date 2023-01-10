import axios from 'axios';
import { BaseResponse } from './response';
import { CANCEL } from 'redux-saga';
import { authAxios } from 'config/axios';

const baseDomain = 'https://ttvnapi.com';
// const baseDomain = "http://127.0.0.1:8080";

export const apiGet = (url: string, header?: any) => {
  const source = axios.CancelToken.source();
  try {
    url = baseDomain + url;

    const promise = authAxios.get(url, {
      headers: header,
      cancelToken: source.token,
    });

    promise[CANCEL] = () => source.cancel();
    return promise;
  } catch (error) {
    console.log(error);
  }
};

export const apiPost = (url: string, payload?: any, header?: any) => {
  const source = axios.CancelToken.source();
  try {
    url = baseDomain + url;

    const promise = authAxios.post<BaseResponse>(url, payload, {
      headers: header,
      cancelToken: source.token,
    });

    promise[CANCEL] = () => source.cancel();
    return promise;
  } catch (error) {
    console.log(error);
  }
};
