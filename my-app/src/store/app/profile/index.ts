import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { profileSaga } from './saga';
import { Profile } from './types';
import { responseProfile } from './response';
import { ErrorResponse } from 'utils/http/response';

export const initialState: Profile = {
  name: 'Nguyễn khánh Thịnh',
  investorType: 2,
  position: 1,
  response: {
    loading: false,
    error: -1,
    message: '',
  },
};

const slice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    // set simple property
    setLoading(state: Profile) {
      state.response.loading = true;
    },
    setResponseError(state: Profile, action: PayloadAction<ErrorResponse>) {
      state.response.error = action.payload.error;
      state.response.message = action.payload.message;
    },

    // reset simple property
    resetLoading(state: Profile) {
      state.response.loading = false;
    },
    resetResponseError(state: Profile) {
      state.response.error = -1;
      state.response.message = '';
    },

    // request

    //response
    responseProfile(state: Profile, action: PayloadAction<responseProfile>) {
      state.name = action.payload.data.name;
      state.investorType = action.payload.data.investorType;
      state.position = action.payload.data.position;
    },
  },
});

export const { actions: profileActions, reducer } = slice;

export const useProfileSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: profileSaga });
  return { actions: slice.actions };
};
