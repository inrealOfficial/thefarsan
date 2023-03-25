import "./ourMenu.css";
import ProducOne from "../mix-chivda.png";
import ProducTwo from "../product2.jpg";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { Navigate, useNavigate } from "react-router-dom";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import deleteImage from "../delete.png";
import ReactImageMagnify from "react-image-magnify";
const ProductShowcase = ({ data, buttonChecker }) => {
  const navigate = useNavigate();
  const [age, setAge] = useState(10);
  const [added, setAdded] = useState(buttonChecker.check);
  const dispatch = useDispatch();

  const [qtSelected, setqtSelected] = useState(buttonChecker.existQty);
  const [price, setPrice] = useState(buttonChecker.existPrice);

  const priceHandler = (value) => {
    setqtSelected(value);
    if (value == "oneKg") {
      setPrice(data.priceList.oneKg.price);
    } else if (value == "twoKg") {
      setPrice(data.priceList.twoKg.price);
    } else if (value == "twofiveG") {
      setPrice(data.priceList.twofiveG.price);
    } else if (value == "fiveHunderedG") {
      setPrice(data.priceList.fiveHunderedG.price);
    } else {
      setqtSelected("oneKg");
      setPrice(data.priceList.oneKg.price);
    }
  };
  const addToCartHandler = async () => {
    dispatch(addToCart(data._id, 1, qtSelected));
    setAdded(true);
  };
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
    setAdded(false);
  };
  return added == true ? (
    <div className="p3-menu-div-added" key={data._id}>
      <img
        src={deleteImage}
        alt=""
        className="product-icon-delete"
        onClick={() => {
          removeFromCartHandler(data._id);
        }}
      />

      <img src={data.image} alt="" className="p3-image" />
      <span className="product-farsan-name-added">{data.name}</span>

      <div className="p3-amount-selection">
        <select
          className="select-option-grams"
          id="amount"
          value={qtSelected}
          onChange={async (e) => {
            priceHandler(e.target.value);
            dispatch(addToCart(data._id, 1, e.target.value));
          }}
        >
          <option value="twofiveG">250 g</option>
          <option value="fiveHunderedG">500 g</option>
          <option value="oneKg">1 kg</option>
          <option value="twoKg">2 kg</option>
        </select>

        <span className="product-farsan-price-added">₹ {price}/-</span>
      </div>
      <button
        className="hp-order-now-btn-p3-added"
        onClick={() => {
          navigate("/cart");
        }}
      >
        Continue to cart <ShoppingBasketIcon sx={{ ml: 1 }} />
      </button>
    </div>
  ) : (
    <div className="p3-menu-div" key={data._id}>
      <img src={data.image} alt="" className="p3-image" />
      <span className="product-farsan-name">{data.name}</span>

      <div className="p3-amount-selection">
        <select
          value={qtSelected}
          className="select-option-grams"
          onChange={(e) => {
            priceHandler(e.target.value);
          }}
        >
          <option value="twofiveG">250 g</option>
          <option value="fiveHunderedG">500 g</option>
          <option value="oneKg">1 kg</option>
          <option value="twoKg">2 kg</option>
        </select>

        <span className="product-farsan-price">₹ {price}/-</span>
      </div>
      <button className="hp-order-now-btn-p3" onClick={addToCartHandler}>
        Add to cart
      </button>
    </div>
  );
};

export default ProductShowcase;
