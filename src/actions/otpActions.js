import axios from "axios";
import {
  OTP_CREATE_FAIL,
  OTP_CREATE_REQUEST,
  OTP_CREATE_SUCESS,
  OTP_VERIFY_FAIL,
  OTP_VERIFY_REQUEST,
  OTP_VERIFY_SUCESS,
} from "../constants/otpConstants";

export const createOTPHandler = (number) => async (dispatch) => {
  try {
    dispatch({
      type: OTP_CREATE_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `https://app-farsan.herokuapp.com/api/sms/send`,
      { number: `+91${number}` },
      config
    );
    dispatch({
      type: OTP_CREATE_SUCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: OTP_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const verifyOTPHandler =
  (phonNumber, otp) => async (dispatch, getState) => {
    console.log(otp);
    try {
      dispatch({
        type: OTP_VERIFY_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `https://app-farsan.herokuapp.com/api/sms/verify`,
        { number: `+91${phonNumber}`, OTPcode: otp },
        config
      );

      dispatch({
        type: OTP_VERIFY_SUCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: OTP_VERIFY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
