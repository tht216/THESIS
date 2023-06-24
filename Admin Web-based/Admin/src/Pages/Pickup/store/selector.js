import { createSelector } from "reselect";
import { INIT_STATE_PICKUP } from "./state";

const selectPickup = (state) => state.PickupReducer || INIT_STATE_PICKUP;

const selectLoading = createSelector(selectPickup, (state) => state.isLoading);
const selectAllPickup = createSelector(
  selectPickup,
  (state) => state.allPickup.data
);
const selectTotal = createSelector(
  selectPickup,
  (state) => state.allPickup.total
);
const selectDetail = createSelector(selectPickup, (state) => state.detail);

export { selectLoading, selectAllPickup, selectTotal, selectDetail };
