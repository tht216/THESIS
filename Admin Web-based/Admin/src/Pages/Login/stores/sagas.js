// file 5
import { takeLatest, call, put } from "redux-saga/effects";

import { setLoadingStep } from "./action";

import { LOGIN } from "./constants";

import { loginService } from "../../../Api/login";

function* loginSaga({ payload, resolve }) {
  yield put(setLoadingStep(true));
  try {
    const response = yield call(loginService, payload);
    console.log(response);
    resolve(response);
    yield put(setLoadingStep(false));
  } catch (error) {
    resolve(null);
    yield put(setLoadingStep(true));
  }
}

export function* authenticateSaga() {
  yield takeLatest(LOGIN, loginSaga);
}
