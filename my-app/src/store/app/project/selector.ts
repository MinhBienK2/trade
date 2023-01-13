import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../types';
import { initialState } from './index';

const selectDomain = (state: RootState) => state.project || initialState;
export const selectProject = createSelector([selectDomain], project => project);

export const selectListProject = createSelector([selectDomain], project => project.projects);
export const selectInvestedProject = createSelector([selectDomain], project => project.investedProject);
export const selectInvestShares = createSelector([selectDomain], project => project.investShares);
export const selectInvestSharesESOP = createSelector([selectDomain], project => project.investSharesESOP);

// response
export const selectLoading = createSelector([selectDomain], wallet => wallet.response.loading);
export const selectError = createSelector([selectDomain], wallet => wallet.response.error);
