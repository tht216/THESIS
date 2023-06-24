import { takeLatest, call, put } from "redux-saga/effects";
import {
  createPickupRequest,
  deletePickupRequest,
  editPickupRequest,
  getAllPickupRequest,
  getDetailPickupRequest,
} from "../../../Api/pickup";
import {
  saveAllPickup,
  saveDetailPickup,
  saveTotalPickup,
  setLoadingStep,
} from "./action";
import {
  CREATE_PICKUP,
  DELETE_PICKUP,
  EDIT_PICKUP,
  GET_ALL_PICKUP,
  GET_DETAIL_PICKUP,
} from "./constant";

function* getAllPickup({ payload, resolve }) {
  try {
    yield put(setLoadingStep(true));
    const response = yield call(getAllPickupRequest, payload);
    yield put(saveAllPickup(response.data.data));
    yield put(saveTotalPickup(response.data.total));
    yield put(setLoadingStep(false));
    resolve(response.data.code);
  } catch (error) {
    console.log(error);
    resolve(null);
    yield put(setLoadingStep(false));
  }
}

function* getDetailPickup({ payload, resolve }) {
  try {
    yield put(setLoadingStep(true));
    const response = yield call(getDetailPickupRequest, payload);
    yield put(saveDetailPickup(response.data.data));
    yield put(setLoadingStep(false));
    resolve(response);
  } catch (error) {
    console.log(error);
    resolve(null);
    yield put(setLoadingStep(false));
  }
}

function* createPickup({ payload, resolve }) {
  try {
    yield put(setLoadingStep(true));
    const response = yield call(createPickupRequest, payload);
    resolve(response);
    yield put(setLoadingStep(false));
  } catch (error) {
    console.log(error);
    resolve(null);
    yield put(setLoadingStep(false));
  }
}
function* editPickup({ payload, id, resolve }) {
  try {
    yield put(setLoadingStep(true));
    const response = yield call(editPickupRequest, payload);
    resolve(response);
    yield put(setLoadingStep(false));
  } catch (error) {
    console.log(error);
    resolve(null);
    yield put(setLoadingStep(false));
  }
}
function* deletePickup({ payload, resolve }) {
  try {
    yield put(setLoadingStep(true));
    const response = yield call(deletePickupRequest, payload);
    resolve(response);
    yield put(setLoadingStep(false));
  } catch (error) {
    console.log(error);
    resolve(null);
    yield put(setLoadingStep(false));
  }
}
export function* PickupSaga() {
  yield takeLatest(GET_ALL_PICKUP, getAllPickup);
  yield takeLatest(CREATE_PICKUP, createPickup);
  yield takeLatest(DELETE_PICKUP, deletePickup);
  yield takeLatest(GET_DETAIL_PICKUP, getDetailPickup);
  yield takeLatest(EDIT_PICKUP, editPickup);
}
