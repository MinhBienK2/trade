import axios from 'axios';
// import { CANCEL } from '@redux-saga/symbols';
import { BaseResponse } from './response';
import { CANCEL } from 'redux-saga';

const baseDomain = 'https://ttvnapi.com';
// const baseDomain = "http://127.0.0.1:8080";

export const apiGet = (url: string, header: any) => {
  const source = axios.CancelToken.source();
  try {
    url = baseDomain + url;

    const promise = axios.get(url, {
      headers: header,
      cancelToken: source.token,
    });

    promise[CANCEL] = () => source.cancel();
    return promise;
  } catch (error) {
    console.log(error);
  }
};

export const apiPost = (url: string, payload: any, header: any) => {
  const source = axios.CancelToken.source();
  try {
    url = baseDomain + url;

    const promise = axios.post<BaseResponse>(url, payload, {
      headers: header,
      cancelToken: source.token,
    });

    promise[CANCEL] = () => source.cancel();
    return promise;
  } catch (error) {
    console.log(error);
  }
};
