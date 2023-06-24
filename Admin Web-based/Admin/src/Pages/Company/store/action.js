import {
  CREATE_COMPANY,
  GET_ALL_COMPANY,
  SAVE_ALL_COMPANY,
  SAVE_TOTAL,
  SET_LOADING_STEP,
  DELETE_COMPANY,
  EDIT_COMPANY,
  SAVE_DETAIL,
  GET_DETAIL_COMPANY,
} from "./constant";

export function setLoadingStep(payload) {
  return {
    type: SET_LOADING_STEP,
    payload,
  };
}
export function saveTotalCompany(payload) {
  return {
    type: SAVE_TOTAL,
    payload,
  };
}
export function saveAllCompany(payload) {
  return {
    type: SAVE_ALL_COMPANY,
    payload,
  };
}
export function saveDetailCompany(payload) {
  return {
    type: SAVE_DETAIL,
    payload,
  };
}

export const asyncGetAllCompanyAction = (dispatch) => (payload) =>
  new Promise((resolve) => {
    dispatch({ type: GET_ALL_COMPANY, payload, resolve });
  });

export const asyncGetDetailCompanyAction = (dispatch) => (payload) =>
  new Promise((resolve) => {
    dispatch({ type: GET_DETAIL_COMPANY, payload, resolve });
  });

export const asyncCreateCompanyAction = (dispatch) => (payload) =>
  new Promise((resolve) => {
    dispatch({ type: CREATE_COMPANY, payload, resolve });
  });

export const asyncDeleteCompanyAction = (dispatch) => (payload) =>
  new Promise((resolve) => {
    dispatch({ type: DELETE_COMPANY, payload, resolve });
  });

export const asyncEditCompanyAction = (dispatch) => (payload) =>
  new Promise((resolve) => {
    dispatch({ type: EDIT_COMPANY, payload, resolve });
  });
