import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, select, takeLatest, delay } from 'redux-saga/effects';
import { Project } from './types';
import { projectActions as actions } from '.';

// mook data
import { sampleProjectData } from './mock/ProjectData';
import { sampleData } from 'app/pages/Account/Data/InvestmentData';

export function* handleResetWallet() {
  yield put(actions.resetProject());
}

export function* FetchListProject() {
  try {
    const url = '';

    const data = { error: 0, message: 'success', data: sampleProjectData };

    if (data.error === 0) {
      yield put(actions.responseUpdateListProject(data.data));
      yield put(actions.resetLoading());
    }
  } catch (error) {
    if (error) {
      yield put(actions.resetLoading());
    }
    console.log(error);
  }
}

export function* fetchInvestedProject() {
  try {
    const url = '';

    const data = { error: 0, message: 'success', data: sampleData };

    if (data.error === 0) {
      yield put(actions.responseUpdateInvestedProject(data.data));
    }
  } catch (error) {
    console.log(error);
  }
}

export function* projectSaga() {
  yield takeLatest(actions.requestUpdateListProject.type, FetchListProject);
  // invested project
  yield takeLatest(
    actions.requestUpdateInvestedProject.type,
    fetchInvestedProject,
  );
}
