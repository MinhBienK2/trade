import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';

import { DataProject, InvestedProject, Project, InvestShares } from './types';
import { projectSaga } from './saga';
import { SimpleProjectResponse } from './response';
import { useEffect } from 'react';
// import { persistor } from 'index';

export const initialState: Project = {
  projects: [],
  investedProject: [],
  investShares: [],
  investSharesESOP: [],
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
      state.investShares = [];
      state.investSharesESOP = [];
    },

    // list project
    requestUpdateListProject(state: Project) {
      state.response.loading = true;
    },
    // responseUpdateListProject(state: Project, action: PayloadAction<DataProject[] | undefined>) {
    responseUpdateListProject(state: Project, action: PayloadAction<SimpleProjectResponse[]>) {
      let listProject: DataProject[] = [];

      for (let project of action.payload) {
        let value: DataProject = {
          projectId: project.id,
          nameProject: project.project,
          shortName: project.shortName,
          pricePerShare: project.price,
          supply: project.supply,
          marketCap: project.marketCap,
          maxTradingShare: project.listed,
          maxTradingValue: project.listedCap,
          currentTradingShare: project.outstanding,
          currentTradingValue: project.outstandingCap,
        };
        listProject.push(value);
      }

      state.projects = listProject;
    },

    // invested project
    requestUpdateInvestedProject(state: Project) {
      state.response.loading = true;
    },
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
        for (let [key, invested] of state.investedProject.entries()) {
          if (invested.id === action.payload.projectId) {
            // quantity
            let numberOfShare = state.investedProject[key].quantity;
            let numberOfShareIncrease = action.payload.numberOfShareIncrease;
            state.investedProject[key].quantity = numberOfShare + numberOfShareIncrease;
            // total value
            state.investedProject[key].priceTotal =
              state.investedProject[key].quantity * state.investedProject[key].pricePerShare;

            break;
          }
        }
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
        let numberOfShare = state.investedProject[action.payload.projectId].quantity;
        let numberOfShareIncrease = action.payload.numberOfShareIncrease;

        state.investedProject[action.payload.projectId].quantity = numberOfShare - numberOfShareIncrease;
      }
    }, // sold shares

    // project detail
    requestUpdateInvestShares() {},
    updateInvestShares(state: Project, action: PayloadAction<InvestShares[]>) {
      state.investShares = action.payload;
    },
    updateInvestSharesESOP(state: Project, action: PayloadAction<InvestShares[]>) {
      state.investSharesESOP = action.payload;
    },
  },
});

export const { actions: projectActions, reducer } = slice;

export const useProjectSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: projectSaga });

  // useEffect(() => {
  //   persistor.persist();
  // }, []);

  return { actions: slice.actions };
};
