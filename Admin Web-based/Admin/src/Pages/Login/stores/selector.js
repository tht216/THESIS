import { INIT_STATE } from "./state";

import { createSelector } from "reselect";

const selectLogin = (state) => state.loginReducer || INIT_STATE;

const selectLoading = createSelector(selectLogin, (state) => state.isLoading);

export { selectLoading };
