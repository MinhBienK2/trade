import { useEffect } from 'react';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from './types';
import { LoginData, UserResponse } from './response';
import { userSaga } from './saga';
// import { persistor } from 'index';

export const initialState: User = {
  isLogin: false,
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
    },
  },
  language: 'vi',
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // set simple property
    setIsLogin(state: User, action: PayloadAction<boolean>) {
      state.isLogin = action.payload;
    },
    setLoading(state: User, action: PayloadAction<boolean>) {
      state.response.loading = action.payload;
    },
    setUserId(state: User, action: PayloadAction<{ id: number }>) {
      state.id = action.payload.id;
    },
    setToken(state: User, action: PayloadAction<{ token: string }>) {
      state.token = action.payload.token;
    },

    setResponseRegister(state: User, action: PayloadAction<{ error: number; message: string }>) {
      state.response.register.error = action.payload.error;
      state.response.register.message = action.payload.message;
    },
    setResponseLogin(state: User, action: PayloadAction<{ error: number; message: string }>) {
      state.response.login.error = action.payload.error;
      state.response.login.message = action.payload.message;
    },
    setLoginTelegram(state: User, action: PayloadAction<{ id: number; token: string }>) {
      state.isLogin = true;
      state.id = action.payload.id;
      state.token = action.payload.token;
    },

    // reset simple property
    resetLoading(state: User) {
      state.response.loading = false;
    },
    resetToken(state: User, action: PayloadAction<{ id: number; token: string }>) {
      state.token = action.payload.token;
      state.response.loading = false;
    },
    resetResponseError(state: User, action: PayloadAction<{ type: 'login' | 'register' }>) {
      if (action.payload.type === 'login') {
        state.response.login.error = -1;
        state.response.login.message = '';
      } else if (action.payload.type === 'register') {
        state.response.register.error = -1;
        state.response.register.message = '';
      }
    },

    // login register
    requestLogin(state: User, action: PayloadAction<LoginData>) {
      state.response.loading = true;
    },
    requestRegister(state: User, action: PayloadAction<LoginData>) {
      state.response.loading = true;
    },
    //call before call api
    requestLogout() {},
    requestLanguage(state: User, action: PayloadAction<'vi' | 'en'>) {
      state.language = action.payload;
    },
    // confirm otp
    requestConfirmOTP(state: User, action: PayloadAction<{ otpCode: string }>) {
      state.response.loading = true;
    },

    // response
    response(
      state: User,
      action: PayloadAction<{
        response: UserResponse;
        type?: 'login' | 'register';
      }>,
    ) {
      state.id = action.payload.response.data.id;
      state.token = action.payload.response.data.token;
      state.status = action.payload.response.data.status;
      state.createTime = action.payload.response.data.createTime;

      // state.isLogin = true;
      state.response.loading = false;
    },
    responseLogout(state: User) {
      state.id = -1;
      state.token = '';
      state.role = 0;
      state.status = 0;
      state.createTime = 0;
      state.isLogin = false;
    },
  },
});

export const { actions: userActions, reducer } = slice;

export const useUserSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: userSaga });

  // useEffect(() => {
  //   persistor.persist();
  // }, []);

  return { actions: slice.actions };
};
