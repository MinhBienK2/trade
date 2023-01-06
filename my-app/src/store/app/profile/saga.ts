import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, select, takeLatest, delay } from 'redux-saga/effects';

import { selectProfile } from './selector';
import { Profile } from './types';
import { selectUser } from '../user/selector';
import { User } from '../user/types';

import { profileActions as actions } from '.';
import { ErrorResponse } from 'utils/http/response';
import { apiPost, apiGet } from '../../../utils/http/request';
import { ProfileResponse } from '../user/response';

export function* profileSaga() {}
