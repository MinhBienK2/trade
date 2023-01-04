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
export const selectAvatar = createSelector(
  [selectDomain],
  profile => profile.avatar,
);
export const selectGender = createSelector(
  [selectDomain],
  profile => profile.gender,
);
export const selectDateOfBirth = createSelector(
  [selectDomain],
  profile => profile.dateOfBirth,
);
export const selectPreferences = createSelector(
  [selectDomain],
  profile => profile.preferences,
);
export const selectHasPreferences = createSelector(
  [selectDomain],
  profile => profile.hasPreferences,
);

export const selectErrorProfile = createSelector(
  [selectDomain],
  profile => profile.response.updateProfile.error,
);
