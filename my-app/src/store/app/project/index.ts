import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';

import { DataProject, InvestedProject, Project } from './types';
import { projectSaga } from './saga';
import { InvestedProjectResponse } from './response';

export const initialState: Project = {
  projects: [],
  investedProject: [],
  response: {
    loading: false,
    error: -1,
    message: '',
  },
};

const slice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    // set simple property
    setResponseError(state: Project, action: PayloadAction<{ error: number; message: string }>) {
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
    resetProject(state: Project) {
      state.projects = [];
      state.investedProject = [];
    },

    // list project
    requestUpdateListProject(state: Project) {
      state.response.loading = true;
    },
    responseUpdateListProject(state: Project, action: PayloadAction<DataProject[]>) {
      if (!!action.payload.length) {
        state.projects = action.payload;
      }
    },

    // invested project
    requestUpdateInvestedProject() {},
    responseUpdateInvestedProject(state: Project, action: PayloadAction<InvestedProject[]>) {
      if (!!action.payload.length) {
        state.investedProject = action.payload;
      }
    },
    increaseInvestShareTransaction(
      state: Project,
      action: PayloadAction<{
        projectId: number;
        numberOfShareIncrease: number;
      }>,
    ) {
      if (!!state.investedProject.length) {
        let numberOfShare = state.investedProject[action.payload.projectId].numberOfSharesPurchased;
        let numberOfShareIncrease = action.payload.numberOfShareIncrease;

        state.investedProject[action.payload.projectId].numberOfSharesPurchased = numberOfShare + numberOfShareIncrease;
      }
    }, // bought shares
    decreaseInvestShareTransaction(
      state: Project,
      action: PayloadAction<{
        projectId: number;
        numberOfShareIncrease: number;
      }>,
    ) {
      if (!!state.investedProject.length) {
        let numberOfShare = state.investedProject[action.payload.projectId].numberOfSharesPurchased;
        let numberOfShareIncrease = action.payload.numberOfShareIncrease;

        state.investedProject[action.payload.projectId].numberOfSharesPurchased = numberOfShare - numberOfShareIncrease;
      }
    }, // sold shares
  },
});

export const { actions: projectActions, reducer } = slice;

export const useProjectSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: projectSaga });
  return { actions: slice.actions };
};
