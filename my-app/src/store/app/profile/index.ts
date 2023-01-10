import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { profileSaga } from './saga';
import { Profile, ProfileInfo } from './types';
import { LinkTelegramResponse, responseProfile } from './response';
import { ErrorResponse } from 'utils/http/response';

export const initialState: Profile = {
  name: '',
  investorType: -1,
  position: -1,
  nameTelegram: '',
  pathLinkTelegram: '',
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
    responseProfile(state: Profile, action: PayloadAction<ProfileInfo>) {
      console.log(action.payload);
      state.name = action.payload.name;
      state.investorType = action.payload.investorType;
      state.position = action.payload.position;
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
  },
});

export const { actions: profileActions, reducer } = slice;

export const useProfileSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: profileSaga });
  return { actions: slice.actions };
};
