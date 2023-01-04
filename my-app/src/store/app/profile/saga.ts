import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, select, takeLatest, delay } from 'redux-saga/effects';

import { selectProfile } from './selector';
import { Profile } from './types';
import { selectUser } from '../user/selector';
import { User } from '../user/types';

import { profileActions as actions } from '.';
import { ProfileResponse } from './response';
import { ErrorResponse } from 'utils/http/response';
import { apiPost, apiGet } from '../../../utils/http/request';

export function* handleSetResponseUpdateProfile(payload: ErrorResponse) {
  yield put(actions.setResponseUpdateProfile(payload));
}
export function* handleResetProfile() {
  yield put(actions.resetProfile());
}

// check has profile exist
export function* checkProfile(loginResponse) {
  try {
    const RESPONSE_ERROR_SUCCESS = 0;
    const ERROR_NOT_PREFERENCES_AXIST = 1;

    if (loginResponse.error === RESPONSE_ERROR_SUCCESS) {
      const data: ProfileResponse = yield apiGet('/v1/gc/auth/getprofile', {
        userId: loginResponse.data.id,
        token: loginResponse.data.token,
      });
      console.log(data);
      if (
        data.error === RESPONSE_ERROR_SUCCESS &&
        data.data.shopping_preferences === null
      ) {
        yield put(actions.handleCheckProfileAxist(ERROR_NOT_PREFERENCES_AXIST));
      } else if (
        data.error === RESPONSE_ERROR_SUCCESS &&
        data.data.shopping_preferences !== null
      ) {
        yield put(actions.handleCheckProfileAxist(RESPONSE_ERROR_SUCCESS));
        yield put(actions.responseOfGetProfile(data));
      }
    }
  } catch (error) {
    console.log(error);
  }
}

// create profile
export function* createProfile() {
  try {
    const user: User = yield select(selectUser);

    const response = yield apiPost('/v1/gc/auth/createprofile', null, {
      userId: user.id,
      token: user.token,
      'content-type': 'appication/json',
    });
    console.log(response);
    if (response.error === 0) yield put(actions.handleCheckProfileAxist(3));
  } catch (err: any) {
    console.log(err);
  }
}

// update preferences
export function* updatePreferences(isSkip) {
  try {
    const user: User = yield select(selectUser);
    const profile: Profile = yield select(selectProfile);
    let body;

    if (isSkip) body = { shopping_preferences: [] };
    else
      body = {
        shopping_preferences: profile.preferences,
      };

    const response = yield apiPost(
      '/v1/gc/profile/updateshoppingpreferences',
      body,
      {
        userId: user.id,
        token: user.token,
      },
    );
    console.log(response);
    if (response.error === 0) yield put(actions.handleCheckProfileAxist(0));
  } catch (err: any) {
    console.log(err);
  }
}

// update information profile
export function* updateProfileInformation(action) {
  try {
    const user: User = yield select(selectUser);
    let body = action.payload;

    console.log(body);
    const response = yield apiPost('/v1/gc/profile/updatepersonalinfo', body, {
      userId: user.id,
      token: user.token,
      'content-type': 'appication/json',
    });

    if (response.error === 0) {
      const data: ProfileResponse = {
        data: { ...action.payload },
        error: response.error,
        message: response.message,
      };
      yield put(actions.responseOfGetProfile(data));
      yield put(
        actions.setResponseUpdateProfile({
          error: response.error,
          message: response.message,
        }),
      );
    }
  } catch (err: any) {
    console.log(err);
  }
}

// update profile
export function* handleChangePassword(action) {
  try {
    const WRONG_PASSWORD = 2;
    const SUCCESS = 0;
    const user: User = yield select(selectUser);
    const body = action.payload;

    const response = yield apiPost('/v1/changepassword', body, {
      userId: user.id,
      token: user.token,
      'content-type': 'appication/json',
    });

    console.log(response);
    if (response.error === SUCCESS || response.error === WRONG_PASSWORD) {
      yield put(
        actions.setResponseUpdateProfile({
          error: response.error,
          message: response.message,
        }),
      );
    }
  } catch (err: any) {
    console.log(err);
  }
}

export function* profileSaga() {
  // profile
  yield takeLatest(actions.requestUpdatePreferences, updatePreferences, false);
  yield takeLatest(actions.requestSkipPreferences, updatePreferences, true);
  yield takeLatest(actions.requestUpdateProfile.type, updateProfileInformation);
  yield takeLatest(actions.requestChangePassword.type, handleChangePassword);
}
