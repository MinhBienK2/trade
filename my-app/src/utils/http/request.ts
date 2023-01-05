import axios from 'axios';
import { CANCEL } from '@redux-saga/symbols';
import { BaseResponse } from './response';

const baseDomain = 'https://ttvnapi.com';
// const baseDomain = "http://127.0.0.1:8080";

export const apiGet = (url: string, header: any) => {
  try {
    url = baseDomain + url;
    let controller = new AbortController();
    let signal = controller.signal;

    const promise = axios.get(url, { headers: header, signal: signal });

    promise[CANCEL] = () => controller.abort();
    return promise;
  } catch (error) {
    console.log(error);
  }
};

export const apiPost = (url: string, payload: any, header: any) => {
  try {
    url = baseDomain + url;
    let controller = new AbortController();
    let signal = controller.signal;

    const promise = axios.post<BaseResponse>(url, payload, {
      headers: header,
      signal: signal,
    });

    promise[CANCEL] = () => controller.abort();
    return promise;
  } catch (error) {
    console.log(error);
  }
};
