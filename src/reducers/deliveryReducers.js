import {
  DELIVERY_CREATE_FAIL,
  DELIVERY_CREATE_REQUEST,
  DELIVERY_CREATE_SUCESS,
  DELIVERY_DELETE_FAIL,
  DELIVERY_DELETE_REQUEST,
  DELIVERY_DELETE_SUCESS,
  DELIVERY_DETAILS_FAIL,
  DELIVERY_DETAILS_REQUEST,
  DELIVERY_DETAILS_RESET,
  DELIVERY_DETAILS_SUCESS,
  DELIVERY_UPDATE_FAIL,
  DELIVERY_UPDATE_REQUEST,
  DELIVERY_UPDATE_RESET,
  DELIVERY_UPDATE_SUCESS,
} from "../constants/deliveryConstants";

export const addDeliveryReducer = (state = {}, action) => {
  switch (action.type) {
    case DELIVERY_CREATE_REQUEST:
      return {
        loading: true,
      };
    case DELIVERY_CREATE_SUCESS:
      return {
        loading: false,
        sucess: true,
        delivery: action.payload,
      };
    case DELIVERY_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const deliveryListMyReducer = (state = { adresses: [] }, action) => {
  switch (action.type) {
    case DELIVERY_DETAILS_REQUEST:
      return {
        loading: true,
      };
    case DELIVERY_DETAILS_SUCESS:
      return {
        loading: false,
        adresses: action.payload,
      };
    case DELIVERY_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case DELIVERY_DETAILS_RESET:
      return {
        adresses: [],
      };
    default:
      return state;
  }
};

export const deleteAdressReducer = (state = {}, action) => {
  switch (action.type) {
    case DELIVERY_DELETE_REQUEST:
      return { loading: true };
    case DELIVERY_DELETE_SUCESS:
      return { loading: false, sucess: true };
    case DELIVERY_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const adressUpdateReducer = (state = { adresses: {} }, action) => {
  switch (action.type) {
    case DELIVERY_UPDATE_REQUEST:
      return { loading: true };
    case DELIVERY_UPDATE_SUCESS:
      return { loading: false, sucess: true };
    case DELIVERY_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case DELIVERY_UPDATE_RESET:
      return {
        adresses: {},
      };
    default:
      return state;
  }
};
