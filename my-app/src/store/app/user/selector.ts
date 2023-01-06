import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../types';
import { initialState } from './index';

const selectDomain = (state: RootState) => state.user || initialState;
export const selectUser = createSelector([selectDomain], user => user);

// profile
export const selectIsLogin = createSelector(
  [selectDomain],
  user => user.isLogin,
);
export const selectToken = createSelector([selectDomain], user => user.token);
export const selectPhoneNumber = createSelector(
  [selectDomain],
  user => user.phoneNumber,
);
export const selectPassword = createSelector(
  [selectDomain],
  user => user.password,
);
export const selectId = createSelector([selectDomain], user => user.id);
export const selectRole = createSelector([selectDomain], user => user.role);

export const selectLanguage = createSelector(
  [selectDomain],
  user => user.language,
);
// response
export const selectLoading = createSelector(
  [selectDomain],
  user => user.response.loading,
);
export const selectErrorLogin = createSelector(
  [selectDomain],
  user => user.response.login.error,
);
export const selectErrorRegister = createSelector(
  [selectDomain],
  user => user.response.register.error,
);
