import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, select, takeLatest, delay } from 'redux-saga/effects';

import { selectProfile } from './selector';
import { Profile } from './types';
import { selectId, selectToken, selectUser } from '../user/selector';
import { User } from '../user/types';

import { profileActions as actions } from '.';
import { ErrorResponse } from 'utils/http/response';
import { apiPost, apiGet } from '../../../utils/http/request';
import { ProfileResponse } from '../user/response';
import { CheckLinkTelegramResponse, LinkTelegramResponse } from './response';

// data test
import { sampleData } from 'app/pages/Account/Data/InvestmentData';

export function* handleResetProfile() {
  yield put(actions.resetProfile());
}

//link third party
export function* handleCheckedLinkTelegram() {
  try {
    const url = '/v1/tele/checklinktelegram';
    const token = yield select(selectToken);
    const userId = yield select(selectId);
    const headers = { token: token, userid: userId };

    const { data }: { data: CheckLinkTelegramResponse } = yield call(
      apiGet,
      url,
      headers,
    );
    console.log(data.data);
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

export function* handleLinkThirdParty(action) {
  try {
    const url = '/v1/tele-link';
    const user: User = yield select(selectUser);

    const { data } = yield call(
      apiPost,
      url,
      {},
      {
        userid: user.id,
        token: user.token,
      },
    );

    if (data.error === 0) {
      yield put(
        actions.responseLinkThirdPartyTelegram(data as LinkTelegramResponse),
      );
      yield put(actions.resetLoading());
    }
  } catch (err: any) {
    console.log(err);
  }
}

// invest shares transaction

export function* handleUpdateInvestShareTransaction() {
  try {
    const data = { error: 0, message: 'success', data: sampleData };

    if (data.error === 0) {
      yield put(actions.insertInvestShareTransaction(data.data));
    }
  } catch (err: any) {
    console.log(err);
  }
}

export function* profileSaga() {
  yield takeLatest(
    actions.requestCheckedLinkTelegram.type,
    handleCheckedLinkTelegram,
  );
  //link third party
  yield takeLatest(actions.requestLinkThirdParty.type, handleLinkThirdParty);
  // invest shares transaction
  yield takeLatest(
    actions.requestUpdateInvestShareTransaction.type,
    handleUpdateInvestShareTransaction,
  );
}
