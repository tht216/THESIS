import { INIT_STATE_SERVICE } from "./state";

import produce from "immer";
import {
  SAVE_ALL_SERVICE,
  SAVE_DETAIL,
  SAVE_TOTAL,
  SET_LOADING_STEP,
} from "./constant";

export default function ServiceReducer(state = INIT_STATE_SERVICE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case SET_LOADING_STEP:
        draft.isLoading = action.payload;
        break;
      case SAVE_ALL_SERVICE:
        draft.allService.data = action.payload;
        break;
      case SAVE_TOTAL:
        draft.allService.total = action.payload;
        break;
      case SAVE_DETAIL:
        draft.detail = action.payload;
        break;
      default:
        return state;
    }
  });
}
