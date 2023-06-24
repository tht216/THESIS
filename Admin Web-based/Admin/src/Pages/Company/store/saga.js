import { takeLatest, call, put } from "redux-saga/effects";
import {
  createCompanyRequest,
  deleteCompanyRequest,
  editCompanyRequest,
  getAllCompanyRequest,
  getDetailCompanyRequest,
} from "../../../Api/company";
import {
  saveAllCompany,
  saveDetailCompany,
  saveTotalCompany,
  setLoadingStep,
} from "./action";
import {
  CREATE_COMPANY,
  DELETE_COMPANY,
  EDIT_COMPANY,
  GET_ALL_COMPANY,
  GET_DETAIL_COMPANY,
} from "./constant";

function* getAllCompany({ payload, resolve }) {
  try {
    yield put(setLoadingStep(true));
    const response = yield call(getAllCompanyRequest, payload);
    yield put(saveAllCompany(response.data.data));
    yield put(saveTotalCompany(response.data.total));
    yield put(setLoadingStep(false));
    resolve(response.data.code);
  } catch (error) {
    console.log(error);
    resolve(null);
    yield put(setLoadingStep(false));
  }
}

function* getDetailCompany({ payload, resolve }) {
  try {
    yield put(setLoadingStep(true));
    const response = yield call(getDetailCompanyRequest, payload);
    yield put(saveDetailCompany(response.data.data));
    yield put(setLoadingStep(false));
    resolve(response);
  } catch (error) {
    console.log(error);
    resolve(null);
    yield put(setLoadingStep(false));
  }
}

function* createCompany({ payload, resolve }) {
  try {
    yield put(setLoadingStep(true));
    const response = yield call(createCompanyRequest, payload);
    resolve(response);
    yield put(setLoadingStep(false));
  } catch (error) {
    console.log(error);
    resolve(null);
    yield put(setLoadingStep(false));
  }
}
function* editCompany({ payload, id, resolve }) {
  try {
    yield put(setLoadingStep(true));
    const response = yield call(editCompanyRequest, payload);
    resolve(response);
    yield put(setLoadingStep(false));
  } catch (error) {
    console.log(error);
    resolve(null);
    yield put(setLoadingStep(false));
  }
}
function* deleteCompany({ payload, resolve }) {
  try {
    yield put(setLoadingStep(true));
    const response = yield call(deleteCompanyRequest, payload);
    resolve(response);
    yield put(setLoadingStep(false));
  } catch (error) {
    console.log(error);
    resolve(null);
    yield put(setLoadingStep(false));
  }
}
export function* CompanySaga() {
  yield takeLatest(GET_ALL_COMPANY, getAllCompany);
  yield takeLatest(CREATE_COMPANY, createCompany);
  yield takeLatest(DELETE_COMPANY, deleteCompany);
  yield takeLatest(GET_DETAIL_COMPANY, getDetailCompany);
  yield takeLatest(EDIT_COMPANY, editCompany);
}
