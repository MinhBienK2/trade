import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../types';
import { initialState } from './index';

const selectDomain = (state: RootState) => state.profile || initialState;
export const selectProfile = createSelector([selectDomain], profile => profile);

// profile
export const selectLoading = createSelector(
  [selectDomain],
  profile => profile.response.loading,
);
export const selectName = createSelector(
  [selectDomain],
  profile => profile.name,
);
export const selectInvestorType = createSelector(
  [selectDomain],
  profile => profile.investorType,
);
export const selectPosition = createSelector(
  [selectDomain],
  profile => profile.position,
);
export const selectError = createSelector(
  [selectDomain],
  profile => profile.response.error,
);
