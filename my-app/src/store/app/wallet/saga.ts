import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, select, takeLatest, delay } from 'redux-saga/effects';
import { Wallet } from './types';
import { walletActions as actions } from '.';
import { projectActions } from '../project';
import { formValue } from 'app/pages/Trade/FormTrade';
import { dataHistory, dataHistoryESOP } from 'app/pages/Trade/data/History';

export function* handleResetWallet() {
  yield put(actions.resetWallet());
}

export function* handleBuyStock() {
  yield put(actions.setResponseError({ error: 0, message: 'success' }));
  yield put(actions.resetLoading());
}

export function* fetchWalletBalance() {
  try {
    const url = '';

    const data = {
      error: 0,
      message: 'success',
      data: { balance: 1000000, esop: 5000000, stock: 300000 },
    };

    if (data.error === 0) {
      yield put(actions.responseUpdateBalance(data));
    }
  } catch (error) {
    console.log(error);
  }
}

// handle Buy Shares
export function* fetchBuyShares(action: PayloadAction<formValue>) {
  try {
    const url = '';
    const body = action.payload;

    const data = {
      error: 0,
      message: 'success',
    };

    if (data.error === 0) {
      const totalValue = body.price * body.quality;

      yield put(
        actions.setResponseError({ error: data.error, message: data.message }),
      );
      yield put(actions.resetLoading());
      // update total money
      yield put(
        actions.responseBoughtShares({
          paymentMethod: body.paymentMethods,
          totalValue: totalValue,
        }),
      );
      // update Invested shares of project
      yield put(
        projectActions.increaseInvestShareTransaction({
          projectId: Number(body.projectId),
          numberOfShareIncrease: body.quality,
        }),
      );
    }
  } catch (error) {
    console.log(error);
  }
}

// handle Buy Shares
export function* fetchHistoryTransaction(
  action: PayloadAction<{ typeWallet: 'balance' | 'esop' }>,
) {
  try {
    const url = '';
    const typeWallet = action.payload.typeWallet;

    let data = { error: 0, message: 'success', data: dataHistory };
    if (typeWallet === 'balance') data.data = dataHistory;
    else if (typeWallet === 'esop') data.data = dataHistoryESOP;

    if (data.error === 0 && typeWallet === 'balance') {
      yield put(actions.updateHistoryTransaction(data.data));
    } else if (data.error === 0 && typeWallet === 'esop')
      yield put(actions.updateHistoryTransactionESOP(data.data));
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
  yield takeLatest(
    actions.requestHistoryTransaction.type,
    fetchHistoryTransaction,
  );
}
