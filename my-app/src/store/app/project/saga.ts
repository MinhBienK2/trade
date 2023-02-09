import { selectId } from './../user/selector';
import { apiGet } from './../../../utils/http/request';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, select, takeLatest, delay } from 'redux-saga/effects';
import { projectActions as actions } from '.';

// mook data
import { InvestedProjectResponse, ListProjectResponse, ProjectDetailResponse } from './response';
import { handleErrorSystem } from '../system/saga';

export function* handleResetWallet() {
  yield put(actions.resetProject());
}

export function* FetchListProject() {
  try {
    const url = '/v1/invest/getallproject';
    const userId = yield select(selectId);

    const { data }: { data: ListProjectResponse } = yield call(apiGet, url, { userId });

    if (data.error === 0) {
      if (!!data.data?.length) yield put(actions.responseUpdateListProject(data.data));
      yield put(actions.resetLoading());
    } else {
      yield put(actions.resetLoading());
    }
  } catch (error) {
    if (error) {
      yield put(actions.resetLoading());
    }
    console.log(error);
    yield handleErrorSystem();
  }
}

export function* fetchInvestedProject() {
  try {
    const userId = yield select(selectId);
    const url = '/v1/invest/getinvestedproject';

    const { data }: { data: InvestedProjectResponse } = yield call(apiGet, url, { userId });

    if (data.error === 0) {
      yield put(actions.responseUpdateInvestedProject(data.data));
      yield put(actions.resetLoading());
    } else yield put(actions.resetLoading());
  } catch (error) {
    if (error) {
      yield put(actions.resetLoading());
    }
    console.log(error);
    yield handleErrorSystem();
  }
}

export function* handleUpdateProjectDetail(action: PayloadAction<{ projectId: number; type: number }>) {
  try {
    const userId = yield select(selectId);
    let url = '/v1/invest/seeallshareproject';

    const { data }: { data: ProjectDetailResponse } = yield call(apiGet, url, { userId });

    if (data.error === 0) {
      const balanceShares = data.data.filter(project => project.type === 0);
      const balanceESOPShares = data.data.filter(project => project.type === 1);

      yield put(actions.updateInvestShares(balanceShares));
      yield put(actions.updateInvestSharesESOP(balanceESOPShares));
    }
  } catch (error) {
    console.log(error);
    yield handleErrorSystem();
  }
}

export function* projectSaga() {
  yield takeLatest(actions.requestUpdateListProject.type, FetchListProject);
  // invested project
  yield takeLatest(actions.requestUpdateInvestedProject.type, fetchInvestedProject);
  // project detail
  yield takeLatest(actions.requestUpdateInvestShares.type, handleUpdateProjectDetail);
}
