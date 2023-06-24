import { INIT_STATE_PICKUP } from "./state";

import produce from "immer";
import {
  SAVE_ALL_PICKUP,
  SAVE_DETAIL,
  SAVE_TOTAL,
  SET_LOADING_STEP,
} from "./constant";

export default function PickupReducer(state = INIT_STATE_PICKUP, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case SET_LOADING_STEP:
        draft.isLoading = action.payload;
        break;
      case SAVE_ALL_PICKUP:
        draft.allPickup.data = action.payload;
        break;
      case SAVE_TOTAL:
        draft.allPickup.total = action.payload;
        break;
      case SAVE_DETAIL:
        draft.detail = action.payload;
        break;
      default:
        return state;
    }
  });
}
