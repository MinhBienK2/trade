import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, select, takeLatest, delay } from 'redux-saga/effects';
import { Project } from './types';
import { projectActions as actions } from '.';

export function* handleResetWallet() {
  yield put(actions.resetProject());
}

export function* projectSaga() {}
