import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, select, takeLatest, delay, cancelled } from 'redux-saga/effects';
import { ErrorResponse } from 'utils/http/response';
import { userActions as actions } from '.';

import { apiPost } from '../../../utils/http/request';
import { UserResponse } from './response';
import { selectId } from './selector';

import { RESPONSE_SUCCESS_ERROR } from 'constants/common';
import {
  RESPONSE_ERROR_NOT_LINK,
  RESPONSE_ERROR_PASSWORD_NOT_AXISTS,
  RESPONSE_ERROR_PHONE_NUMBER_NOT_AXISTS,
} from 'constants/register';
import { handleCheckedLinkTelegram, handleLinkThirdParty, handleResetProfile } from '../profile/saga';
import { handleResetWallet } from '../wallet/saga';
import { projectActions } from '../project';
import { handleErrorSystem } from '../system/saga';

export function* login(action) {
  try {
    const RESPONSE_MESSAGE_NOT_LINK = 'unlinked account';
    const body: any = {
      username: action.payload.phoneNumber,
      password: action.payload.password,
    };

    const { data }: { data: UserResponse } = yield call(apiPost, '/v1/login', body);

    if (data.error === RESPONSE_SUCCESS_ERROR) {
      const checkLinked = yield handleCheckedLinkTelegram({ userId: data.data.id, token: data.data.token });
      console.log(checkLinked);
      if (checkLinked) {
        yield put(actions.response({ response: data, type: 'login' }));
        yield put(actions.setResponseLogin({ error: data.error, message: data.message }));
      } else {
        yield put(actions.setResponseLogin({ error: RESPONSE_ERROR_NOT_LINK, message: RESPONSE_MESSAGE_NOT_LINK }));
        yield put(actions.resetLoading());
      }
    } else if (data.error === RESPONSE_ERROR_PHONE_NUMBER_NOT_AXISTS || data.error === RESPONSE_ERROR_PASSWORD_NOT_AXISTS) {
      yield put(actions.setResponseLogin({ error: data.error, message: data.message }));
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
    const { data }: { data: UserResponse } = yield call(apiPost, '/v1/register', body);

    console.log(data);
    if (data.error === 0) {
      const activatedTelegram = yield handleLinkThirdParty({ userId: data.data.id, token: data.data.token });
      if (activatedTelegram) {
        yield put(actions.setResponseRegister({ error: data.error, message: data.message }));
      }
      // yield put(actions.response({ response: data, type: 'register' }));
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
    const dataHeader: any = {
      userid: userId,
    };

    const { data }: { data: ErrorResponse } = yield call(apiPost, '/v1/logout', null, dataHeader);

    if (data.error === 0) {
      yield put(actions.responseLogout());
      yield handleResetProfile();
      yield handleResetWallet();
      yield put(projectActions.resetProject());
    }
  } catch (err: any) {
    console.log(err);
    yield handleErrorSystem();
  }
}

export function* handleConfirmOTP(action: PayloadAction<{ otpCode: string }>) {
  try {
    const url = '';
    const optCode = action.payload.otpCode;
    const { data } = {
      data: {
        error: 0,
        message: 'success',
      },
    };
    if (data.error === 0) {
      yield put(actions.setIsLogin(true));
    } else yield put(actions.setResponseLogin({ error: data.error, message: data.message }));
  } catch (error) {
    console.log(error);
  }
}

export function* userSaga() {
  // register
  yield takeLatest(actions.requestLogin.type, login);
  yield takeLatest(actions.requestRegister.type, register);
  yield takeLatest(actions.requestLogout.type, Logout);
  // confirm otp
  yield takeLatest(actions.requestConfirmOTP.type, handleConfirmOTP);
}
