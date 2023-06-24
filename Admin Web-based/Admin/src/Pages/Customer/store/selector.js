import { createSelector } from "reselect";
import { INIT_STATE_CUSTOMER } from "./state";

const selectCustomer = (state) => state.CustomerReducer || INIT_STATE_CUSTOMER;

const selectLoading = createSelector(selectCustomer, (state) => state.isLoading);
const selectAllCustomer = createSelector(
  selectCustomer,
  (state) => state.allCustomer.data
);
const selectTotal = createSelector(
  selectCustomer,
  (state) => state.allCustomer.total
);
const selectDetail = createSelector(selectCustomer, (state) => state.detail);

export { selectLoading, selectAllCustomer, selectTotal, selectDetail };
