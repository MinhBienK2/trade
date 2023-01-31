import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, select, takeLatest, delay } from 'redux-saga/effects';

import { selectId, selectToken, selectUser } from '../user/selector';
import { User } from '../user/types';

import { profileActions as actions } from '.';
import { apiPost, apiGet } from '../../../utils/http/request';
import { CheckLinkTelegramResponse, LinkTelegramResponse, responseProfile } from './response';

export function* handleResetProfile() {
  yield put(actions.resetProfile());
}

// check has profile exist
export function* checkProfile(userId, token) {
  try {
    const url = '/v1/invest/getmyinformation';

    const { data }: { data: responseProfile } = yield call(apiGet, url, { userId, token });

    if (data.error === 0) {
      yield put(actions.responseProfile(data.data));
    }
  } catch (error) {
    console.log(error);
  }
}

//link third party
export function* handleCheckedLinkTelegram() {
  try {
    console.log('check telegram');
    const url = '/v1/tele/checklinktelegram';
    const token = yield select(selectToken);
    const userId = yield select(selectId);
    const headers = { token: token, userid: userId };

    const { data }: { data: CheckLinkTelegramResponse } = yield call(apiGet, url, headers);

    if (data.error === 0) {
      yield put(
        actions.setNameLinkThirdParty({
          name: data.data.telegram_info,
        }),
      );
    }
  } catch (err: any) {
    console.log(err);
  }
}

export function* handleLinkThirdParty({ userId, token }) {
  try {
    const url = '/v1/tele-link';

    const { data } = yield call(
      apiPost,
      url,
      {},
      {
        userid: userId,
        token: token,
      },
    );

    if (data.error === 0) {
      yield put(actions.responseLinkThirdPartyTelegram(data as LinkTelegramResponse));
      return true;
    } else return false;
  } catch (err: any) {
    console.log(err);
  }
}

export function* profileSaga() {
  yield takeLatest(actions.requestCheckedLinkTelegram.type, handleCheckedLinkTelegram);
}
