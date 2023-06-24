import {
  CREATE_CUSTOMER,
  GET_ALL_CUSTOMER,
  SAVE_ALL_CUSTOMER,
  SAVE_TOTAL,
  SET_LOADING_STEP,
  DELETE_CUSTOMER,
  EDIT_CUSTOMER,
  SAVE_DETAIL,
  GET_DETAIL_CUSTOMER,
} from "./constant";

export function setLoadingStep(payload) {
  return {
    type: SET_LOADING_STEP,
    payload,
  };
}
export function saveTotalCustomer(payload) {
  return {
    type: SAVE_TOTAL,
    payload,
  };
}
export function saveAllCustomer(payload) {
  return {
    type: SAVE_ALL_CUSTOMER,
    payload,
  };
}
export function saveDetailCustomer(payload) {
  return {
    type: SAVE_DETAIL,
    payload,
  };
}

export const asyncGetAllCustomerAction = (dispatch) => (payload) =>
  new Promise((resolve) => {
    dispatch({ type: GET_ALL_CUSTOMER, payload, resolve });
  });

export const asyncGetDetailCustomerAction = (dispatch) => (payload) =>
  new Promise((resolve) => {
    dispatch({ type: GET_DETAIL_CUSTOMER, payload, resolve });
  });

export const asyncCreateCustomerAction = (dispatch) => (payload) =>
  new Promise((resolve) => {
    dispatch({ type: CREATE_CUSTOMER, payload, resolve });
  });

export const asyncDeleteCustomerAction = (dispatch) => (payload) =>
  new Promise((resolve) => {
    dispatch({ type: DELETE_CUSTOMER, payload, resolve });
  });

export const asyncEditCustomerAction = (dispatch) => (payload) =>
  new Promise((resolve) => {
    dispatch({ type: EDIT_CUSTOMER, payload, resolve });
  });
