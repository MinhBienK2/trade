import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../types';
import { initialState } from './index';

const selectDomain = (state: RootState) => state.wallet || initialState;
export const selectWallet = createSelector([selectDomain], wallet => wallet);

export const selectBalance = createSelector(
  [selectDomain],
  wallet => wallet.balance,
);
export const selectESOP = createSelector([selectDomain], wallet => wallet.esop);
export const selectStock = createSelector(
  [selectDomain],
  wallet => wallet.stock,
);

export const selectHistoryTransaction = createSelector(
  [selectDomain],
  wallet => wallet.history_transaction,
);
export const selectHistoryTransactionESOP = createSelector(
  [selectDomain],
  wallet => wallet.history_transaction_ESOP,
);

// response

export const selectLoading = createSelector(
  [selectDomain],
  wallet => wallet.response.loading,
);
export const selectError = createSelector(
  [selectDomain],
  wallet => wallet.response.error,
);
