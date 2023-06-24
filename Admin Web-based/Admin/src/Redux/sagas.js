import { all } from "redux-saga/effects";
import { authenticateSaga } from "../Pages/Login/stores/sagas";
import { CustomerSaga } from "../Pages/Customer/store/saga";
import { CompanySaga } from "../Pages/Company/store/saga";
import { ServiceSaga } from "../Pages/Service/store/saga";
import { PickupSaga } from "../Pages/Pickup/store/saga";
// eslint-disable-next-line import/no-anonymous-default-export
export default function* () {
  yield all([
    authenticateSaga(),
    CustomerSaga(),
    CompanySaga(),
    ServiceSaga(),
    PickupSaga(),
  ]);
}
