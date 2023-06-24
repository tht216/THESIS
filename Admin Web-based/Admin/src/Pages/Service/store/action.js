import {
  CREATE_SERVICE,
  GET_ALL_SERVICE,
  SAVE_ALL_SERVICE,
  SAVE_TOTAL,
  SET_LOADING_STEP,
  DELETE_SERVICE,
  EDIT_SERVICE,
  SAVE_DETAIL,
  GET_DETAIL_SERVICE,
} from "./constant";

export function setLoadingStep(payload) {
  return {
    type: SET_LOADING_STEP,
    payload,
  };
}
export function saveTotalService(payload) {
  return {
    type: SAVE_TOTAL,
    payload,
  };
}
export function saveAllService(payload) {
  return {
    type: SAVE_ALL_SERVICE,
    payload,
  };
}
export function saveDetailService(payload) {
  return {
    type: SAVE_DETAIL,
    payload,
  };
}

export const asyncGetAllServiceAction = (dispatch) => (payload) =>
  new Promise((resolve) => {
    dispatch({ type: GET_ALL_SERVICE, payload, resolve });
  });

export const asyncGetDetailServiceAction = (dispatch) => (payload) =>
  new Promise((resolve) => {
    dispatch({ type: GET_DETAIL_SERVICE, payload, resolve });
  });

export const asyncCreateServiceAction = (dispatch) => (payload) =>
  new Promise((resolve) => {
    dispatch({ type: CREATE_SERVICE, payload, resolve });
  });

export const asyncDeleteServiceAction = (dispatch) => (payload) =>
  new Promise((resolve) => {
    dispatch({ type: DELETE_SERVICE, payload, resolve });
  });

export const asyncEditServiceAction = (dispatch) => (payload) =>
  new Promise((resolve) => {
    dispatch({ type: EDIT_SERVICE, payload, resolve });
  });
