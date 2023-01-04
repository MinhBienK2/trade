import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { profileSaga } from './saga';
import { Profile } from './types';
import { ProfileResponse } from './response';
import { ErrorResponse } from 'utils/http/response';

export const initialState: Profile = {
  fullName: '',
  avatar: '',
  gender: -1,
  dateOfBirth: '',
  preferences: [],
  hasPreferences: 0, // 0: success  1: not preferences
  response: {
    updateProfile: {
      error: -1,
      message: '',
    },
  },
};

const slice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    // set simple property

    // requestCreateProfilePlayer() {},
    handleCheckProfileAxist(state: Profile, action: PayloadAction<number>) {
      state.hasPreferences = action.payload;
    },
    resetProfile(state: Profile) {
      state.avatar = '';
      state.dateOfBirth = '';
      state.fullName = '';
      state.gender = -1;
      state.hasPreferences = 0;
      state.preferences = [];
      state.response.updateProfile.error = -1;
      state.response.updateProfile.message = '';
    },
    responseOfGetProfile(
      state: Profile,
      action: PayloadAction<ProfileResponse>,
    ) {
      console.log(action.payload);
      if (action.payload.error === 0) {
        state.fullName = action.payload.data.fullname;
        state.avatar = action.payload.data.avatar;
        state.gender = action.payload.data.gender;
        state.dateOfBirth = action.payload.data.date_of_birth;
        state.preferences = action.payload.data.shopping_preferences;
      }
    },
    setAvatar(state: Profile, action: PayloadAction<string>) {
      state.avatar = action.payload;
    },

    resetResponseUpdateProfile(state: Profile) {
      state.response.updateProfile.error = -1;
      state.response.updateProfile.message = '';
    },
    setResponseUpdateProfile(
      state: Profile,
      action: PayloadAction<ErrorResponse>,
    ) {
      state.response.updateProfile.error = action.payload.error;
      state.response.updateProfile.message = action.payload.message;
    },

    requestUpdateProfile(state: Profile, action: PayloadAction<any>) {},
    // profile upload avatar
    responseUploadAvatar(state: Profile, action: PayloadAction<File>) {},
    // change password
    requestChangePassword(
      state: Profile,
      action: PayloadAction<{ password: string; new_password: string }>,
    ) {},

    // profile update preferences
    requestUpdatePreferences() {},
    requestSkipPreferences() {},
    setPreferences(
      state: Profile,
      action: PayloadAction<{ isChoose: boolean; value: number }>,
    ) {
      if (!action.payload.isChoose) {
        state.preferences.push(action.payload.value);
      } else {
        state.preferences = state.preferences.filter(ele => {
          if (ele !== action.payload.value) return ele;
        });
      }
    },
  },
});

export const { actions: profileActions, reducer } = slice;

export const useProfileSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: profileSaga });
  return { actions: slice.actions };
};
