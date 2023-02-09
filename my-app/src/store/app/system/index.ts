import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { systemSaga } from './saga';
import { System } from './types';
import { persistor } from 'index';
import { useEffect } from 'react';

export const initialState: System = {
  errorSystem: false,
};

const slice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    // set simple property
    setErrorSystem(state: System) {
      state.errorSystem = true;
    },
  },
});

export const { actions: systemActions, reducer } = slice;

export const useSystemSlice = () => {
  useEffect(() => {
    persistor.persist();
  }, []);

  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: systemSaga });

  return { actions: slice.actions };
};
