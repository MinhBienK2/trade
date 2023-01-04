import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, select, takeLatest, delay } from 'redux-saga/effects';
import { selectUser } from './selector';
import { User } from './types';
import { userActions as actions } from '.';

import { BaseResponse } from 'utils/http/response';
import { apiPost, apiGet } from '../../../utils/http/request';
import { getWallet, logoutWallet } from '../wallet/saga';
import { checkProfile, handleResetProfile } from '../profile/saga';
import { handleResetThirdParty } from '../thirdParty/saga';

export function* handleSetToken(payload: { id: number; token: string }) {
  yield put(actions.resetToken(payload));
}
export function* handleSetUsername(payload: { username: string }) {
  yield put(actions.setUsername(payload));
}

export function* login() {
  try {
    // Select username from store
    const user: User = yield select(selectUser);
    const data: any = {
      username: user.username,
      password: user.password,
    };
    // call api check login
    const loginResponse: BaseResponse = yield apiPost('/v1/login', data, {
      'content-type': 'appication/json',
    });

    // check profile axist ?
    yield checkProfile(loginResponse);
    //get coin and diamond of user
    if (loginResponse.data) yield getWallet(loginResponse);

    yield put(actions.response({ response: loginResponse, type: 'login' }));
  } catch (err: any) {
    console.log('Error: ', err);
    const response: BaseResponse = {
      error: 1,
      message: 'system_error',
      data: '',
    };
    yield put(actions.response({ response, type: 'login' }));
  }
}

export function* register() {
  try {
    // Select username from store
    const user: User = yield select(selectUser);
    const data: any = {
      username: user.username,
      password: user.password,
    };
    const response: BaseResponse = yield apiPost('/v1/register', data, {
      'content-type': 'appication/json',
    });
    // check profile axist ?
    yield checkProfile(response);

    yield put(actions.response({ response, type: 'register' }));
  } catch (err: any) {
    const response: BaseResponse = {
      error: 1,
      message: 'system_error',
      data: undefined,
    };
    yield put(actions.response({ response, type: 'register' }));
  }
}

export function* Logout() {
  try {
    const user: User = yield select(selectUser);
    const dataHeader: any = {
      userid: user.id,
      token: user.token,
    };

    const response: BaseResponse = yield apiPost(
      '/v1/logout',
      null,
      dataHeader,
    );

    if (response.error === 0) {
      yield logoutWallet();
      yield handleResetProfile();
      yield handleResetThirdParty();
      yield put(actions.responseLogout(response));
    }
  } catch (err: any) {
    const response: BaseResponse = {
      error: 1,
      message: 'system_error',
      data: undefined,
    };
    // random choise type
    yield put(actions.response({ response, type: 'login' }));
  }
}

export function* userSaga() {
  // register
  yield takeLatest(actions.requestLogin.type, login);
  yield takeLatest(actions.requestRegister.type, register);
  yield takeLatest(actions.requestLogout.type, Logout);
}
