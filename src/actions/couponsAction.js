import axios from "axios";
import {
  COUPONS_CREATE_FAIL,
  COUPONS_CREATE_REQUEST,
  COUPONS_CREATE_SUCESS,
} from "../constants/couponsConstant";

export const listMyCoupons = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: COUPONS_CREATE_REQUEST,
    });

    const { data } = await axios.get(
      `https://hcc-backend.onrender.com/api/coupons/getmycoupons`
    );

    dispatch({
      type: COUPONS_CREATE_SUCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COUPONS_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
