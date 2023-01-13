import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';

import { Wallet } from './types';
import { walletSaga } from './saga';
import { DataBalance, HistoryTransaction, walletBalanceResponse } from './response';

import { formValue } from 'app/pages/Trade/FormTrade';

export const initialState: Wallet = {
  balance: 0,
  esop: 0,
  stock: 0,
  history_transaction: [],
  history_transaction_ESOP: [],
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
    setResponseError(state: Wallet, action: PayloadAction<{ error: number; message: string }>) {
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
    pushHistoryTransaction(state: Wallet, action: PayloadAction<HistoryTransaction>) {
      state.history_transaction.push(action.payload);
    },
    pushHistoryTransactionESOP(state: Wallet, action: PayloadAction<HistoryTransaction>) {
      state.history_transaction_ESOP.push(action.payload);
    },

    // request
    requestBuyStock(state: Wallet, action: PayloadAction<any>) {
      state.response.loading = true;
    },
    requestUpdateBalance() {},

    // response
    responseUpdateBalance(state: Wallet, action: PayloadAction<DataBalance>) {
      state.balance = action.payload.balance;
      state.esop = action.payload.esopBalance;
      state.stock = action.payload.shareBalance;
    },

    // buy shares
    requestBuyShares(state: Wallet, action: PayloadAction<formValue>) {
      state.response.loading = true;
    },
    responseBoughtShares(state: Wallet, action: PayloadAction<{ paymentMethod: number; totalValue: number }>) {
      const PAYMENT_BY_BALANCE = 0;
      const PAYMENT_BY_ESOP = 1;
      const payload = action.payload;
      //update total money
      if (payload.paymentMethod === PAYMENT_BY_BALANCE && payload.totalValue) {
        state.balance = state.balance - payload.totalValue;
        state.stock = state.stock + payload.totalValue;
      } else if (payload.paymentMethod === PAYMENT_BY_ESOP && payload.totalValue) {
        state.esop = state.esop - payload.totalValue;
        state.stock = state.stock + payload.totalValue;
      }
    },

    // get history transaction
    requestHistoryTransaction(state, action: PayloadAction<{ typeWallet: 'balance' | 'esop' }>) {},
    updateHistoryTransaction(state: Wallet, action: PayloadAction<HistoryTransaction[]>) {
      state.history_transaction = action.payload;
    },
    updateHistoryTransactionESOP(state: Wallet, action: PayloadAction<HistoryTransaction[]>) {
      state.history_transaction_ESOP = action.payload;
    },
  },
});

export const { actions: walletActions, reducer } = slice;

export const useWalletSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: walletSaga });
  return { actions: slice.actions };
};
