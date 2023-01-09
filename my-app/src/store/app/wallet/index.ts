import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';

import { Wallet } from './types';
import { walletSaga } from './saga';
import { HistoryTransaction } from './response';

import { dataHistory, dataHistoryESOP } from 'app/pages/Trade/data/History';

export const initialState: Wallet = {
  balance: 10000000,
  esop: 500000,
  stock: 300000,
  history_transaction: dataHistory,
  history_transaction_ESOP: dataHistoryESOP,
  response: {
    loading: false,
    error: -1,
    message: '',
  },
};

const slice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    // set simple property
    setResponseError(
      state: Wallet,
      action: PayloadAction<{ error: number; message: string }>,
    ) {
      state.response.error = action.payload.error;
      state.response.message = action.payload.message;
    },

    // reset
    resetLoading(state: Wallet) {
      state.response.loading = false;
    },
    resetResponse(state: Wallet) {
      state.response = { loading: false, error: -1, message: '' };
    },
    resetWallet(state: Wallet) {
      state.balance = 0;
      state.esop = 0;
      state.stock = 0;
      state.history_transaction_ESOP = [];
      state.history_transaction = [];
    },

    // handle
    pushHistoryTransaction(
      state: Wallet,
      action: PayloadAction<HistoryTransaction>,
    ) {
      state.history_transaction.push(action.payload);
    },
    pushHistoryTransactionESOP(
      state: Wallet,
      action: PayloadAction<HistoryTransaction>,
    ) {
      state.history_transaction_ESOP.push(action.payload);
    },

    // request
    requestBuyStock(state: Wallet, action: PayloadAction<any>) {
      state.response.loading = true;
    },
  },
});

export const { actions: walletActions, reducer } = slice;

export const useWalletSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: walletSaga });
  return { actions: slice.actions };
};
