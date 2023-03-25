import "./OurMenuPage.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import ProducOne from "../mix-chivda.png";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import ProductShowcase from "./productShowcase";
import Loader from "./Loader";
import FarsanLoader from "./FarsanLoader/FarsanLoader";
import Header from "./Header/Header";
import { removeFromCart } from "../actions/cartActions";
import ReactImageMagnify from "react-image-magnify";
import { motion } from "framer-motion";
const OurMenu = () => {
  const [age, setAge] = useState(10);
  const dispatch = useDispatch();
  const [searchFeild, setSearchFeild] = useState("");
  const [searchProduct, setSearchProduct] = useState([]);
  const productList = useSelector((state) => state.productList);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const { loading, error, products } = productList;
  const [existedItem, setExistItem] = useState();
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(listProducts());
    if (products) {
      console.log(products);
    }
  }, [dispatch]);

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      trasnsition: {
        delay: 1.5,
        duration: 1.5,
      },
    },
    exit: {
      x: "-100vw",
      trasnsition: {
        ease: "easeInOut",
      },
    },
  };
  const checkCartButton = (cartItems, currProductID, price) => {
    if (cartItems) {
      const existItem = cartItems.find((x) => x.product === currProductID);
      if (existItem) {
        return {
          check: true,
          existPrice: existItem.price,
          existQty: existItem.qtySelected,
        };
      } else {
        return {
          check: false,
          existPrice: price,
          existQty: "oneKg",
        };
      }
    }
  };

  const displayProducts = () => {
    return products
      .filter((product) =>
        product.name.toLowerCase().includes(searchFeild.toLowerCase())
      )
      .map((product) => (
        <ProductShowcase
          qty={`something`}
          data={product}
          buttonChecker={checkCartButton(
            cartItems,
            product._id,
            product.priceList[`oneKg`].price
          )}
        />
      ));
  };
  return (
    <>
      <Header />
      <motion.div
        className="ourMenu"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="ourMenu-content">
          <div className="top-content-ourMenu">
            <span className="top-content-ourMenu-text">OUR MENU</span>
            <input
              type="text"
              name=""
              id=""
              className="ourMenu-searchBar"
              placeholder="Search For your favourite farsan's"
              onChange={(e) => {
                setSearchFeild(e.target.value);
              }}
            />
          </div>
          <div className="bottom-content-ourMenu">
            <div className="bottom-content-ourMenu-inner">
              {loading ? (
                <FarsanLoader />
              ) : error ? (
                <h1>{error}</h1>
              ) : (
                displayProducts()
              )}
              {/* <div className="p3-menu-div">
              <img src={ProducOne} alt="" className="p3-image" />
              <span className="product-farsan-name">Bombay Sev</span>

              <div className="p3-amount-selection">
                <FormControl sx={{ m: 1, minWidth: 150 }}>
                  <InputLabel id="demo-simple-select-label">Amount</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Age"
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>100 Grams</MenuItem>
                    <MenuItem value={20}>500 Grams</MenuItem>
                    <MenuItem value={30}>1 Kg</MenuItem>
                    <MenuItem value={30}>2 Kg</MenuItem>
                  </Select>
                </FormControl>
                <span className="product-farsan-price">₹ 500/-</span>
              </div>
              <a href="/about" className="hp-order-now-btn-p3">
                Add to cart
              </a>
            </div> */}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default OurMenu;
