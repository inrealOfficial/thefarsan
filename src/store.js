import { combineReducers, applyMiddleware } from "redux";
import { createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productDeleteReducer,
  productListReducer,
} from "./reducers/productReducers";
import {
  userDeleteReducer,
  userDetailsReducer,
  userForgotPassword,
  userListReducer,
  userLoginReducer,
  userResetPassword,
  userUpdateProfileReducer,
  userUpdateReducer,
} from "./reducers/userReducers";
import { cartReducer } from "./reducers/cartReducers";
import { userRegisterReducer } from "./reducers/userReducers";
import {
  orderCreateReducer,
  orderDeleteReducer,
  orderDeliveredReducer,
  orderDetailsReducer,
  orderListMyReducer,
  orderListReducer,
  orderPayReducer,
  orderStageReducer,
} from "./reducers/orderReducers";
import {
  addDeliveryReducer,
  adressUpdateReducer,
  deleteAdressReducer,
  deliveryListMyReducer,
} from "./reducers/deliveryReducers";
import { createOTPReducer, verifyOTPReducer } from "./reducers/otpReducers";
import { listCoupons, listCouponsReducer } from "./reducers/couponsReducers";
const reducer = combineReducers({
  productList: productListReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
  orderDelivered: orderDeliveredReducer,
  orderDelete: orderDeleteReducer,
  orderStage: orderStageReducer,
  addDelivery: addDeliveryReducer,
  getAdresses: deliveryListMyReducer,
  deleteAdresses: deleteAdressReducer,
  updateAdress: adressUpdateReducer,
  userForgotPassword: userForgotPassword,
  userResetPassword: userResetPassword,
  productDeleteReducer: productDeleteReducer,
  createOTP: createOTPReducer,
  verifyOTP: verifyOTPReducer,
  getCoupons: listCouponsReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const shippingAdressFromStorage = localStorage.getItem("shippingAdress")
  ? JSON.parse(localStorage.getItem("shippingAdress"))
  : {};

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAdress: shippingAdressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
