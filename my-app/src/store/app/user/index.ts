import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { LoginData, User } from './types';
import { userSaga } from './saga';
import { BaseResponse } from 'utils/http/response';

export const initialState: User = {
  isLogin: false,
  username: '',
  password: '',
  token: '',
  status: 0,
  role: 0,
  id: -1,
  createTime: 0,
  response: {
    loading: false,
    register: {
      error: -1,
      message: '',
    },
    login: {
      error: -1,
      message: '',
      remember_password: true,
    },
  },
  language: 'vi',
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // set simple property
    setUserId(state: User, action: PayloadAction<{ id: number }>) {
      state.id = action.payload.id;
    },
    setUsername(state: User, action: PayloadAction<{ username: string }>) {
      state.username = action.payload.username;
    },

    // reset simple property
    resetLoading(state: User) {
      state.response.loading = false;
    },
    // login register
    requestLogin(state: User, action: PayloadAction<LoginData>) {
      state.username = action.payload.username;
      state.password = action.payload.password;
      state.response.login.remember_password = action.payload.remember_password;
      state.response.loading = true;
    },
    requestRegister(state: User, action: PayloadAction<LoginData>) {
      state.username = action.payload.username;
      state.password = action.payload.password;
      state.response.loading = true;
    },
    //call before call api
    requestLogout() {},
    requestLanguage(state: User, action: PayloadAction<'vi' | 'en'>) {
      state.language = action.payload;
    },

    response(
      state: User,
      action: PayloadAction<{
        response: BaseResponse;
        type?: 'login' | 'register';
      }>,
    ) {
      // if had error
      state.response[`${action.payload.type}`].error =
        action.payload.response.error;
      state.response[`${action.payload.type}`].message =
        action.payload.response.message;
      // success
      if (action.payload.response.error === 0) {
        state.isLogin = true;
        state.id = action.payload.response.data.id;
        state.token = action.payload.response.data.token;
        state.status = action.payload.response.data.status;
        state.createTime = action.payload.response.data.createTime;
      }
      state.response.loading = false;
    },
    responseLogout(state: User, action: PayloadAction<BaseResponse>) {
      state.id = -1;
      state.token = '';
      state.role = 0;
      state.status = 0;
      state.createTime = 0;
      state.isLogin = false;
      state.response.login.error = -1;
      state.response.login.message = '';
    },
    resetToken(
      state: User,
      action: PayloadAction<{ id: number; token: string }>,
    ) {
      state.token = action.payload.token;
      state.response.loading = false;
    },
    resetErrorResponse(
      state: User,
      action: PayloadAction<{ type?: 'login' | 'register' }>,
    ) {
      if (action.payload.type) {
        state.response[`${action.payload.type}`].error = -1;
        state.response[`${action.payload.type}`].message = '';
      } else {
        state.response.login.error = -1;
        state.response.login.message = '';
        state.response.register.error = -1;
        state.response.register.message = '';
      }
    },
  },
});

export const { actions: userActions, reducer } = slice;

export const useUserSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: userSaga });
  return { actions: slice.actions };
};
