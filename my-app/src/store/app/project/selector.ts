import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../types';
import { initialState } from './index';

const selectDomain = (state: RootState) => state.project || initialState;
export const selectWallet = createSelector([selectDomain], project => project);

// response
export const selectLoading = createSelector(
  [selectDomain],
  wallet => wallet.response.loading,
);
export const selectError = createSelector(
  [selectDomain],
  wallet => wallet.response.error,
);
