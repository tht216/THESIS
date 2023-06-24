import { createSelector } from "reselect";
import { INIT_STATE_COMPANY } from "./state";

const selectCompany = (state) => state.CompanyReducer || INIT_STATE_COMPANY;

const selectLoading = createSelector(selectCompany, (state) => state.isLoading);
const selectAllCompany = createSelector(
  selectCompany,
  (state) => state.allCompany.data
);
const selectTotal = createSelector(
  selectCompany,
  (state) => state.allCompany.total
);
const selectDetail = createSelector(selectCompany, (state) => state.detail);

export { selectLoading, selectAllCompany, selectTotal, selectDetail };
