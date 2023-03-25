import {
  OTP_CREATE_FAIL,
  OTP_CREATE_REQUEST,
  OTP_CREATE_RESET,
  OTP_CREATE_SUCESS,
  OTP_VERIFY_FAIL,
  OTP_VERIFY_REQUEST,
  OTP_VERIFY_RESET,
  OTP_VERIFY_SUCESS,
} from "../constants/otpConstants";

export const createOTPReducer = (state = {}, action) => {
  switch (action.type) {
    case OTP_CREATE_REQUEST:
      return {
        loading: true,
      };
    case OTP_CREATE_SUCESS:
      return {
        loading: false,
        sucess: true,
        otp: action.payload,
      };
    case OTP_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case OTP_CREATE_RESET:
      return {
        state: {},
      };
    default:
      return state;
  }
};

export const verifyOTPReducer = (state = { loading: false }, action) => {
  switch (action.type) {
    case OTP_VERIFY_REQUEST:
      return {
        loading: true,
      };
    case OTP_VERIFY_SUCESS:
      return {
        loading: false,
        sucess: true,
        otp: action.payload,
      };
    case OTP_VERIFY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case OTP_VERIFY_RESET:
      return {
        state: {},
      };
    default:
      return state;
  }
};
