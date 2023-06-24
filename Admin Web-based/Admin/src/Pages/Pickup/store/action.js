import {
  CREATE_PICKUP,
  GET_ALL_PICKUP,
  SAVE_ALL_PICKUP,
  SAVE_TOTAL,
  SET_LOADING_STEP,
  DELETE_PICKUP,
  EDIT_PICKUP,
  SAVE_DETAIL,
  GET_DETAIL_PICKUP,
} from "./constant";

export function setLoadingStep(payload) {
  return {
    type: SET_LOADING_STEP,
    payload,
  };
}
export function saveTotalPickup(payload) {
  return {
    type: SAVE_TOTAL,
    payload,
  };
}
export function saveAllPickup(payload) {
  return {
    type: SAVE_ALL_PICKUP,
    payload,
  };
}
export function saveDetailPickup(payload) {
  return {
    type: SAVE_DETAIL,
    payload,
  };
}

export const asyncGetAllPickupAction = (dispatch) => (payload) =>
  new Promise((resolve) => {
    dispatch({ type: GET_ALL_PICKUP, payload, resolve });
  });

export const asyncGetDetailPickupAction = (dispatch) => (payload) =>
  new Promise((resolve) => {
    dispatch({ type: GET_DETAIL_PICKUP, payload, resolve });
  });

export const asyncCreatePickupAction = (dispatch) => (payload) =>
  new Promise((resolve) => {
    dispatch({ type: CREATE_PICKUP, payload, resolve });
  });

export const asyncDeletePickupAction = (dispatch) => (payload) =>
  new Promise((resolve) => {
    dispatch({ type: DELETE_PICKUP, payload, resolve });
  });

export const asyncEditPickupAction = (dispatch) => (payload) =>
  new Promise((resolve) => {
    dispatch({ type: EDIT_PICKUP, payload, resolve });
  });
