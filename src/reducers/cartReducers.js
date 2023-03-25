import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_REMOVE_SHIPPING_ADRESS,
  CART_RESET,
  CART_SAVE_SHIPPING_ADRESS,
} from "../constants/cartConstants";

export const cartReducer = (
  state = { cartItems: [], shippingAdress: {} },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === item.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    case CART_SAVE_SHIPPING_ADRESS:
      return {
        ...state,
        shippingAdress: action.payload,
      };
    case CART_REMOVE_SHIPPING_ADRESS:
      localStorage.removeItem("shippingAdress");
      return {
        ...state,
        shippingAdress: {},
      };
    case CART_RESET:
      return { ...state, cartItems: [] };
    default:
      return state;
  }
};
