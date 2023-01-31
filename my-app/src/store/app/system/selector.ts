import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../types';
import { initialState } from './index';

const selectDomain = (state: RootState) => state.system || initialState;
export const selectProfile = createSelector([selectDomain], system => system);

export const selectErrorSystem = createSelector([selectDomain], system => system.errorSystem);
