import { combineReducers } from "redux";
import loginReducer from "../Pages/Login/stores/reducer";
import CustomerReducer from "../Pages/Customer/store/reducer";
import CompanyReducer from "../Pages/Company/store/reducer";
import ServiceReducer from "../Pages/Service/store/reducer";
import PickupReducer from "../Pages/Pickup/store/reducer";
export default function createReducer() {
  const rootReducer = combineReducers({
    loginReducer,
    CustomerReducer,
    CompanyReducer,
    ServiceReducer,
    PickupReducer,
  });
  return rootReducer;
}
