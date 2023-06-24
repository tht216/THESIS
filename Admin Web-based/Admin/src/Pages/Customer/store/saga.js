import { takeLatest, call, put } from "redux-saga/effects";
import {
  createCustomerRequest,
  deleteCustomerRequest,
  editCustomerRequest,
  getAllCustomerRequest,
  getDetailCustomerRequest,
} from "../../../Api/customer";
import {
  saveAllCustomer,
  saveDetailCustomer,
  saveTotalCustomer,
  setLoadingStep,
} from "./action";
import {
  CREATE_CUSTOMER,
  DELETE_CUSTOMER,
  EDIT_CUSTOMER,
  GET_ALL_CUSTOMER,
  GET_DETAIL_CUSTOMER,
} from "./constant";

function* getAllCustomer({ payload, resolve }) {
  try {
    yield put(setLoadingStep(true));
    const response = yield call(getAllCustomerRequest, payload);
    yield put(saveAllCustomer(response.data.data));
    yield put(saveTotalCustomer(response.data.total));
    yield put(setLoadingStep(false));
    resolve(response.data.code);
  } catch (error) {
    console.log(error);
    resolve(null);
    yield put(setLoadingStep(false));
  }
}

function* getDetailCustomer({ payload, resolve }) {
  try {
    yield put(setLoadingStep(true));
    const response = yield call(getDetailCustomerRequest, payload);
    yield put(saveDetailCustomer(response.data.data));
    yield put(setLoadingStep(false));
    resolve(response);
  } catch (error) {
    console.log(error);
    resolve(null);
    yield put(setLoadingStep(false));
  }
}

function* createCustomer({ payload, resolve }) {
  try {
    yield put(setLoadingStep(true));
    const response = yield call(createCustomerRequest, payload);
    resolve(response);
    yield put(setLoadingStep(false));
  } catch (error) {
    console.log(error);
    resolve(null);
    yield put(setLoadingStep(false));
  }
}
function* editCustomer({ payload, id, resolve }) {
  try {
    yield put(setLoadingStep(true));
    const response = yield call(editCustomerRequest, payload);
    resolve(response);
    yield put(setLoadingStep(false));
  } catch (error) {
    console.log(error);
    resolve(null);
    yield put(setLoadingStep(false));
  }
}
function* deleteCustomer({ payload, resolve }) {
  try {
    yield put(setLoadingStep(true));
    const response = yield call(deleteCustomerRequest, payload);
    resolve(response);
    yield put(setLoadingStep(false));
  } catch (error) {
    console.log(error);
    resolve(null);
    yield put(setLoadingStep(false));
  }
}
export function* CustomerSaga() {
  yield takeLatest(GET_ALL_CUSTOMER, getAllCustomer);
  yield takeLatest(CREATE_CUSTOMER, createCustomer);
  yield takeLatest(DELETE_CUSTOMER, deleteCustomer);
  yield takeLatest(GET_DETAIL_CUSTOMER, getDetailCustomer);
  yield takeLatest(EDIT_CUSTOMER, editCustomer);
}
