import { takeLatest, call, put } from "redux-saga/effects";
import {
  createServiceRequest,
  deleteServiceRequest,
  editServiceRequest,
  getAllServiceRequest,
  getDetailServiceRequest,
} from "../../../Api/service";
import {
  saveAllService,
  saveDetailService,
  saveTotalService,
  setLoadingStep,
} from "./action";
import {
  CREATE_SERVICE,
  DELETE_SERVICE,
  EDIT_SERVICE,
  GET_ALL_SERVICE,
  GET_DETAIL_SERVICE,
} from "./constant";

function* getAllService({ payload, resolve }) {
  try {
    yield put(setLoadingStep(true));
    const response = yield call(getAllServiceRequest, payload);
    yield put(saveAllService(response.data.data));
    yield put(saveTotalService(response.data.total));
    yield put(setLoadingStep(false));
    resolve(response.data.code);
  } catch (error) {
    console.log(error);
    resolve(null);
    yield put(setLoadingStep(false));
  }
}

function* getDetailService({ payload, resolve }) {
  try {
    yield put(setLoadingStep(true));
    const response = yield call(getDetailServiceRequest, payload);
    yield put(saveDetailService(response.data.data));
    yield put(setLoadingStep(false));
    resolve(response);
  } catch (error) {
    console.log(error);
    resolve(null);
    yield put(setLoadingStep(false));
  }
}

function* createService({ payload, resolve }) {
  try {
    yield put(setLoadingStep(true));
    const response = yield call(createServiceRequest, payload);
    resolve(response);
    yield put(setLoadingStep(false));
  } catch (error) {
    console.log(error);
    resolve(null);
    yield put(setLoadingStep(false));
  }
}
function* editService({ payload, id, resolve }) {
  try {
    yield put(setLoadingStep(true));
    const response = yield call(editServiceRequest, payload);
    resolve(response);
    yield put(setLoadingStep(false));
  } catch (error) {
    console.log(error);
    resolve(null);
    yield put(setLoadingStep(false));
  }
}
function* deleteService({ payload, resolve }) {
  try {
    yield put(setLoadingStep(true));
    const response = yield call(deleteServiceRequest, payload);
    resolve(response);
    yield put(setLoadingStep(false));
  } catch (error) {
    console.log(error);
    resolve(null);
    yield put(setLoadingStep(false));
  }
}
export function* ServiceSaga() {
  yield takeLatest(GET_ALL_SERVICE, getAllService);
  yield takeLatest(CREATE_SERVICE, createService);
  yield takeLatest(DELETE_SERVICE, deleteService);
  yield takeLatest(GET_DETAIL_SERVICE, getDetailService);
  yield takeLatest(EDIT_SERVICE, editService);
}
