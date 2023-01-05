import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, select, takeLatest, delay } from 'redux-saga/effects';

import { selectProfile } from './selector';
import { Profile } from './types';
import { selectUser } from '../user/selector';
import { User } from '../user/types';

import { profileActions as actions } from '.';
import { ErrorResponse } from 'utils/http/response';
import { apiPost, apiGet } from '../../../utils/http/request';
import { ProfileResponse } from '../user/response';

// check has profile exist
export function* checkProfile(loginResponse) {
  // try {
  //   const RESPONSE_ERROR_SUCCESS = 0;
  //   const ERROR_NOT_PREFERENCES_AXIST = 1;
  //   if (loginResponse.error === RESPONSE_ERROR_SUCCESS) {
  //     const { data }: { data: ProfileResponse } = yield call(
  //       apiGet,
  //       '/v1/gc/auth/getprofile',
  //       {
  //         userId: loginResponse.data.id,
  //         token: loginResponse.data.token,
  //       },
  //     );
  //     console.log(data);
  //     if (
  //       data.error === RESPONSE_ERROR_SUCCESS &&
  //     ) {
  //       yield put(actions.handleCheckProfileAxist(ERROR_NOT_PREFERENCES_AXIST));
  //     } else if (
  //       data.error === RESPONSE_ERROR_SUCCESS &&
  //       data.data.shopping_preferences !== null
  //     ) {
  //       yield put(actions.handleCheckProfileAxist(RESPONSE_ERROR_SUCCESS));
  //       yield put(actions.responseOfGetProfile(data));
  //     }
  //   }
  // } catch (error) {
  //   console.log(error);
  // }
}

// create profile
export function* createProfile() {
  // try {
  //   const user: User = yield select(selectUser);
  //   const response = yield apiPost('/v1/gc/auth/createprofile', null, {
  //     userId: user.id,
  //     token: user.token,
  //     'content-type': 'appication/json',
  //   });
  //   console.log(response);
  //   if (response.error === 0) yield put(actions.handleCheckProfileAxist(3));
  // } catch (err: any) {
  //   console.log(err);
  // }
}

export function* profileSaga() {
  // profile
}
