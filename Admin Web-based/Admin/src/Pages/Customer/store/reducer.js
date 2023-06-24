import { INIT_STATE_CUSTOMER } from "./state";

import produce from "immer";
import {
  SAVE_ALL_CUSTOMER,
  SAVE_DETAIL,
  SAVE_TOTAL,
  SET_LOADING_STEP,
} from "./constant";

export default function CustomerReducer(state = INIT_STATE_CUSTOMER, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case SET_LOADING_STEP:
        draft.isLoading = action.payload;
        break;
      case SAVE_ALL_CUSTOMER:
        draft.allCustomer.data = action.payload;
        break;
      case SAVE_TOTAL:
        draft.allCustomer.total = action.payload;
        break;
      case SAVE_DETAIL:
        draft.detail = action.payload;
        break;
      default:
        return state;
    }
  });
}
