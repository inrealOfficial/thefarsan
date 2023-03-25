import axios from "axios";
import {
  DELIVERY_CREATE_FAIL,
  DELIVERY_CREATE_REQUEST,
  DELIVERY_CREATE_SUCESS,
  DELIVERY_DELETE_FAIL,
  DELIVERY_DELETE_REQUEST,
  DELIVERY_DELETE_SUCESS,
  DELIVERY_DETAILS_FAIL,
  DELIVERY_DETAILS_REQUEST,
  DELIVERY_DETAILS_SUCESS,
  DELIVERY_UPDATE_FAIL,
  DELIVERY_UPDATE_REQUEST,
  DELIVERY_UPDATE_SUCESS,
} from "../constants/deliveryConstants";

export const createDelivery = (delivery) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELIVERY_CREATE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(
      `https://hcc-backend.onrender.com/api/delivery`,
      delivery,
      config
    );

    dispatch({
      type: DELIVERY_CREATE_SUCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELIVERY_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listMyAdresses = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELIVERY_DETAILS_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(
      `https://hcc-backend.onrender.com/api/delivery/myadresses`,
      config
    );

    dispatch({
      type: DELIVERY_DETAILS_SUCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELIVERY_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteAdress = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELIVERY_DELETE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(
      `https://hcc-backend.onrender.com/api/delivery/${id}`,
      config
    );

    dispatch({
      type: DELIVERY_DELETE_SUCESS,
    });
  } catch (error) {
    dispatch({
      type: DELIVERY_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateAdress = (adress) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELIVERY_UPDATE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `https://hcc-backend.onrender.com/api/delivery/${adress._id}`,
      adress,
      config
    );

    dispatch({
      type: DELIVERY_UPDATE_SUCESS,
    });
    dispatch({
      type: DELIVERY_DETAILS_SUCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELIVERY_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
