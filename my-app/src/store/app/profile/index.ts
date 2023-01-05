import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { profileSaga } from './saga';
import { Profile } from './types';
import {} from './response';
import { ErrorResponse } from 'utils/http/response';

export const initialState: Profile = {
  name: '',
  investorType: '',
  position: '',
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
  },
});

export const { actions: profileActions, reducer } = slice;

export const useProfileSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: profileSaga });
  return { actions: slice.actions };
};
