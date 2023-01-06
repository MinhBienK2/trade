import { PayloadAction } from '@reduxjs/toolkit';
import {
  call,
  put,
  select,
  takeLatest,
  delay,
  cancelled,
} from 'redux-saga/effects';
import { ErrorResponse } from 'utils/http/response';
import { userActions as actions } from '.';

import { apiPost } from '../../../utils/http/request';
import { UserResponse } from './response';
import { selectId, selectToken } from './selector';

import { RESPONSE_SUCCESS_ERROR } from 'const/common';
import {
  RESPONSE_ERROR_PASSWORD_NOT_AXISTS,
  RESPONSE_ERROR_PHONE_NUMBER_NOT_AXISTS,
} from 'const/register';

export function* login(action) {
  try {
    const body: any = {
      username: action.payload.phoneNumber,
      password: action.payload.password,
    };

    const { data }: { data: UserResponse } = yield call(
      apiPost,
      '/v1/login',
      body,
      {
        'content-type': 'appication/json',
      },
    );

    console.log(data);
    if (data.error === RESPONSE_SUCCESS_ERROR)
      yield put(actions.response({ response: data, type: 'login' }));
    else if (
      data.error === RESPONSE_ERROR_PHONE_NUMBER_NOT_AXISTS ||
      data.error === RESPONSE_ERROR_PASSWORD_NOT_AXISTS
    ) {
      yield put(
        actions.setResponseLogin({ error: data.error, message: data.message }),
      );
      yield put(actions.resetLoading());
    }
  } catch (err: any) {
    console.log('Error: ', err);
  } finally {
    if (yield cancelled()) {
      console.log('saga cancel!');
    }
  }
}

export function* register(action) {
  try {
    const body: any = {
      username: action.payload.phoneNumber,
      password: action.payload.password,
    };
    const { data }: { data: UserResponse } = yield call(
      apiPost,
      '/v1/register',
      body,
      {
        'content-type': 'appication/json',
      },
    );

    console.log(data);
    if (data.error === 0) {
      yield put(actions.response({ response: data, type: 'register' }));
    } else if (data.error === 10) {
      yield put(
        actions.setResponseRegister({
          error: data.error,
          message: data.message,
        }),
      );
      yield put(actions.resetLoading());
    }
  } catch (err: any) {
    console.log(err);
  }
}

export function* Logout() {
  try {
    const userId = yield select(selectId);
    const token = yield select(selectToken);
    const dataHeader: any = {
      userid: userId,
      token: token,
    };

    const { data }: { data: ErrorResponse } = yield call(
      apiPost,
      '/v1/logout',
      null,
      dataHeader,
    );
    console.log(data);
    if (data.error === 0) {
      yield put(actions.responseLogout());
    }
  } catch (err: any) {
    console.log(err);
  }
}

export function* userSaga() {
  // register
  yield takeLatest(actions.requestLogin.type, login);
  yield takeLatest(actions.requestRegister.type, register);
  yield takeLatest(actions.requestLogout.type, Logout);
}
