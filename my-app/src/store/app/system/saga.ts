import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, select, takeLatest, delay } from 'redux-saga/effects';

import { apiPost, apiGet } from '../../../utils/http/request';
import { systemActions as actions } from '.';

export function* handleErrorSystem() {
  yield put(actions.setErrorSystem());
}

export function* systemSaga() {}
