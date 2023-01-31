import { apiGet, apiPost } from './../../../utils/http/request';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, select, takeLatest, delay, takeEvery } from 'redux-saga/effects';
import { Wallet } from './types';
import { walletActions as actions } from '.';
import { projectActions } from '../project';
import { formValue } from 'app/pages/Trade/FormTrade';
import { selectId } from '../user/selector';
import { HistoryTransactionResponse, walletBalanceResponse } from './response';

export function* handleResetWallet() {
  yield put(actions.resetWallet());
}

export function* handleBuyStock() {
  yield put(actions.setResponseError({ error: 0, message: 'success' }));
  yield put(actions.resetLoading());
}

export function* fetchWalletBalance() {
  try {
    const url = '/v1/invest/getmywallet';
    const userId = yield select(selectId);

    const { data }: { data: walletBalanceResponse } = yield call(apiGet, url, { userId });

    if (data.error === 0) {
      yield put(actions.responseUpdateBalance(data.data));
      yield put(actions.resetLoading());
    } else yield put(actions.resetLoading());
  } catch (error) {
    console.log(error);
  }
}

// handle Buy Shares
export function* fetchBuyShares(action: PayloadAction<formValue>) {
  try {
    const url = '/v1/invest/buyshareproject';
    const userId = yield select(selectId);
    const body = {
      projectId: Number(action.payload.projectId),
      quantity: action.payload.quantity,
      type: action.payload.paymentMethods,
    };

    const { data } = yield call(apiPost, url, body, { userId });

    if (data.error === 0) {
      const totalValue = action.payload.price * action.payload.quantity;

      yield put(actions.setResponseError({ error: data.error, message: data.message }));
      yield put(actions.resetLoading());
      // update total money
      yield put(
        actions.responseBoughtShares({
          paymentMethod: action.payload.paymentMethods,
          totalValue: totalValue,
        }),
      );
      // update Invested shares of project
      yield put(
        projectActions.increaseInvestShareTransaction({
          projectId: Number(body.projectId),
          numberOfShareIncrease: action.payload.quantity,
        }),
      );
    }
  } catch (error) {
    console.log(error);
  }
}

// handle Buy Shares
export function* fetchHistoryTransaction(action: PayloadAction<{ typeWallet: 'balance' | 'esop' }>) {
  try {
    const userId = yield select(selectId);
    const typeWallet = action.payload.typeWallet;
    let url = '/v1/invest/historytransaction';

    if (typeWallet === 'balance') url = url + '?type=0';
    else if (typeWallet === 'esop') url = url + '?type=1';

    const { data }: { data: HistoryTransactionResponse } = yield call(apiGet, url, { userId });

    if (data.error === 0 && typeWallet === 'balance') {
      yield put(actions.updateHistoryTransaction(data.data));
      yield put(actions.resetLoading());
    } else if (data.error === 0 && typeWallet === 'esop') {
      yield put(actions.updateHistoryTransactionESOP(data.data));
      yield put(actions.resetLoading());
    } else yield put(actions.resetLoading());
  } catch (error) {
    console.log(error);
  }
}

export function* walletSaga() {
  yield takeLatest(actions.requestBuyStock.type, handleBuyStock);
  yield takeLatest(actions.requestUpdateBalance.type, fetchWalletBalance);

  // Buy shares
  yield takeLatest(actions.requestBuyShares.type, fetchBuyShares);

  // get history transaction
  yield takeEvery(actions.requestHistoryTransaction.type, fetchHistoryTransaction);
}
