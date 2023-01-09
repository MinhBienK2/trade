import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, select, takeLatest, delay } from 'redux-saga/effects';
import { Wallet } from './types';
import { walletActions as actions } from '.';

export function* handleResetWallet() {
  yield put(actions.resetWallet());
}

export function* handleBuyStock(action) {
  yield put(actions.setResponseError({ error: 0, message: 'success' }));
  yield put(actions.resetLoading());
}

export function* walletSaga() {
  yield takeLatest(actions.requestBuyStock.type, handleBuyStock);
}
