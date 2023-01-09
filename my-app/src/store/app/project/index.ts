import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';

import { Project } from './types';
import { projectSaga } from './saga';

export const initialState: Project = {
  response: {
    loading: false,
    error: -1,
    message: '',
  },
};

const slice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    // set simple property
    setResponseError(
      state: Project,
      action: PayloadAction<{ error: number; message: string }>,
    ) {
      state.response.error = action.payload.error;
      state.response.message = action.payload.message;
    },

    // reset
    resetLoading(state: Project) {
      state.response.loading = false;
    },
    resetResponse(state: Project) {
      state.response = { loading: false, error: -1, message: '' };
    },
    resetProject(state: Project) {},
  },
});

export const { actions: projectActions, reducer } = slice;

export const useProjectSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: projectSaga });
  return { actions: slice.actions };
};
