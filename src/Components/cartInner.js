import ButtonGroup from "@mui/material/ButtonGroup";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cartActions";
const CartInner = ({ item }) => {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(item.qty);
  const [style, setStyle] = useState({});
  useEffect(() => {
    if (qty === 0) {
      setStyle({
        textDecoration: "line-through",
      });
    } else {
      setStyle();
    }
  }, [qty, dispatch]);
  const maxQty = 10;
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  return (
    <div className="content-one-right-cart" key={item.product}>
      <span className="span-content-one-right-cart-head" style={style}>
        {item.name}
      </span>
      <ButtonGroup
        variant="outlined"
        aria-label="outlined primary button group"
      >
        <IconButton
          aria-label="delete"
          onClick={() => {
            if (qty <= maxQty - 1) {
              setQty(qty + 1);
              dispatch(addToCart(item.product, Number(item.qty + 1)));
            }
            console.log("Add icon clicked");
          }}
        >
          <AddIcon />
        </IconButton>
        <IconButton
          aria-label="delete"
          onClick={() => {
            if (qty > 0) {
              setQty(qty - 1);
              dispatch(addToCart(item.product, Number(item.qty - 1)));
            }
            console.log("Add icon clicked");
          }}
        >
          <RemoveIcon />
        </IconButton>
      </ButtonGroup>
      <span className="span-content-one-right-cart-number">x{item.qty}</span>
      <IconButton
        aria-label="delete"
        onClick={() => {
          removeFromCartHandler(item.product);
        }}
      >
        <DeleteOutlineIcon />
      </IconButton>

      <span className="span-content-one-right-cart-price" style={style}>
        {" "}
        ₹ {item.price}
      </span>
    </div>
  );
};

export default CartInner;
