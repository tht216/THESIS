import { createSelector } from "reselect";
import { INIT_STATE_SERVICE } from "./state";

const selectService = (state) => state.ServiceReducer || INIT_STATE_SERVICE;

const selectLoading = createSelector(selectService, (state) => state.isLoading);
const selectAllService = createSelector(
  selectService,
  (state) => state.allService.data
);
const selectTotal = createSelector(
  selectService,
  (state) => state.allService.total
);
const selectDetail = createSelector(selectService, (state) => state.detail);

export { selectLoading, selectAllService, selectTotal, selectDetail };
