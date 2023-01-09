import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { profileSaga } from './saga';
import { InvestSharesTransaction, Profile } from './types';
import { LinkTelegramResponse, responseProfile } from './response';
import { ErrorResponse } from 'utils/http/response';

export const initialState: Profile = {
  name: 'Nguyễn khánh Thịnh',
  investorType: 2,
  position: 1,
  nameTelegram: '',
  pathLinkTelegram: '',
  investSharesTransaction: [],
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
    resetPathLinkTelegram(state: Profile) {
      state.pathLinkTelegram = '';
    },
    resetProfile(state: Profile) {
      state.name = '';
      state.investorType = -1;
      state.position = -1;
      state.nameTelegram = '';
      state.pathLinkTelegram = '';
    },
    // request

    //response
    responseProfile(state: Profile, action: PayloadAction<responseProfile>) {
      state.name = action.payload.data.name;
      state.investorType = action.payload.data.investorType;
      state.position = action.payload.data.position;
    },

    // link third party
    requestCheckedLinkTelegram() {},
    setNameLinkThirdParty(
      state: Profile,
      action: PayloadAction<{ name: string }>,
    ) {
      state.nameTelegram = action.payload.name;
    },
    requestLinkThirdParty(state: Profile) {
      state.response.loading = true;
    },
    responseLinkThirdPartyTelegram(
      state: Profile,
      action: PayloadAction<LinkTelegramResponse>,
    ) {
      state.pathLinkTelegram = action.payload.data.link;
    },

    // invest shares transaction
    requestUpdateInvestShareTransaction() {},
    insertInvestShareTransaction(
      state: Profile,
      action: PayloadAction<InvestSharesTransaction[]>,
    ) {
      const dataInvestShares = action.payload;

      if (!!dataInvestShares.length) {
        for (let invest of dataInvestShares) {
          state.investSharesTransaction.push(invest);
        }
      }
    },
    increaseInvestShareTransaction(
      state: Profile,
      action: PayloadAction<{
        projectId: number;
        numberOfShareIncrease: number;
      }>,
    ) {
      let numberOfShare =
        state.investSharesTransaction[action.payload.projectId].numberOfShare;
      let numberOfShareIncrease = action.payload.numberOfShareIncrease;

      state.investSharesTransaction[action.payload.projectId].numberOfShare =
        numberOfShare + numberOfShareIncrease;
    }, // bought shares
    decreaseInvestShareTransaction(
      state: Profile,
      action: PayloadAction<{
        projectId: number;
        numberOfShareIncrease: number;
      }>,
    ) {
      let numberOfShare =
        state.investSharesTransaction[action.payload.projectId].numberOfShare;
      let numberOfShareIncrease = action.payload.numberOfShareIncrease;

      state.investSharesTransaction[action.payload.projectId].numberOfShare =
        numberOfShare - numberOfShareIncrease;
    }, // sold shares
  },
});

export const { actions: profileActions, reducer } = slice;

export const useProfileSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: profileSaga });
  return { actions: slice.actions };
};
