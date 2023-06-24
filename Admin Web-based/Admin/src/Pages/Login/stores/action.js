import { LOGIN, SET_LOADING_STEP } from "./constants";

export function setLoadingStep(payload) {
  return {
    type: SET_LOADING_STEP,
    payload,
  };
}

export const asyncLoginAction = (dispatch) => (payload) =>
  new Promise((resolve) => {
    dispatch({ type: LOGIN, payload, resolve });
  });
