import { INIT_STATE } from "./state";

import { SET_LOADING_STEP } from "./constants";

import produce from "immer";

export default function loginReducer(state = INIT_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case SET_LOADING_STEP:
        draft.isLoading = action.payload;
        break;
      default:
        return state;
    }
  });
}
