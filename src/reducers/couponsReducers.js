import {
  COUPONS_CREATE_RESET,
  COUPONS_CREATE_FAIL,
  COUPONS_CREATE_REQUEST,
  COUPONS_CREATE_SUCESS,
} from "../constants/couponsConstant";

export const listCouponsReducer = (state = { coupons: [] }, action) => {
  switch (action.type) {
    case COUPONS_CREATE_REQUEST:
      return {
        loading: true,
      };
    case COUPONS_CREATE_SUCESS:
      return {
        loading: false,
        sucess: true,
        coupons: action.payload,
      };
    case COUPONS_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case COUPONS_CREATE_RESET:
      return {
        coupons: [],
      };
    default:
      return state;
  }
};
