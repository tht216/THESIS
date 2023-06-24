import { INIT_STATE_COMPANY } from "./state";

import produce from "immer";
import {
  SAVE_ALL_COMPANY,
  SAVE_DETAIL,
  SAVE_TOTAL,
  SET_LOADING_STEP,
} from "./constant";

export default function CompanyReducer(state = INIT_STATE_COMPANY, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case SET_LOADING_STEP:
        draft.isLoading = action.payload;
        break;
      case SAVE_ALL_COMPANY:
        draft.allCompany.data = action.payload;
        break;
      case SAVE_TOTAL:
        draft.allCompany.total = action.payload;
        break;
      case SAVE_DETAIL:
        draft.detail = action.payload;
        break;
      default:
        return state;
    }
  });
}
