import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../types';
import { initialState } from './index';

const selectDomain = (state: RootState) => state.profile || initialState;
export const selectProfile = createSelector([selectDomain], profile => profile);

// profile
export const selectFullName = createSelector(
  [selectDomain],
  profile => profile.name,
);
