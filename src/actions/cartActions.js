import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADRESS,
} from "../constants/cartConstants";

export const addToCart =
  (id, qty, qtSelected) => async (dispatch, getState) => {
    const { data } = await axios.get(
      `http://localhost:5000/api/products/${id}`
    );
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.priceList[`${qtSelected}`].price,
        qtySelected: qtSelected,
        qty,
      },
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAdress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADRESS,
    payload: data,
  });

  localStorage.setItem("shippingAdress", JSON.stringify(data));
};
