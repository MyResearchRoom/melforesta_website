import { combineReducers } from "redux";
import { categoryReducer } from "./categoryReducer";
import { productReducer } from "./productReducer";
import {wishlistDataReducer} from "./wishlistData";
import { cartDataReducer } from "./cartData";
import { loggedUserReducer } from "./loggedUderReducer";
import { countReducer } from "./countReducer";
import { customerAddressReducer } from "./customerAddress";
import { orderProductProcessReducer } from "./orderProductProcessReducer";
import { canceledProductReducer } from "./cancledOrderReducer";
import { returnedProductReducer } from "./returnedOrderReducer";
import { couponReducer } from "./couponsReducer";
const rootReducer = combineReducers({
  categoryState: categoryReducer,
  productState: productReducer,
  wishlistState:wishlistDataReducer,
  cartState:cartDataReducer,
  loggedUserState: loggedUserReducer,
  countState: countReducer,
  customerAddressState:customerAddressReducer,
  processProductState:orderProductProcessReducer,
  cancleProductState:canceledProductReducer,
  returnProductState:returnedProductReducer,
  couponState:couponReducer,

});

export default rootReducer;
