import "./cart.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PaymentIcon from "@mui/icons-material/Payment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartInner from "./cartInner";
import { removeFromCart, saveShippingAdress } from "../actions/cartActions";
import PaymentsIcon from "@mui/icons-material/Payments";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import CreditCardTwoToneIcon from "@mui/icons-material/CreditCardTwoTone";
import { createOrder } from "../actions/orderActions";
import { Link, useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";
import CartEmpty from "../undraw_empty_cart_co35.svg";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import AlertTitle from "@mui/material/AlertTitle";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import deliveryAdress from "../undraw_delivery_address_re_cjca.svg";
import HomeIcon from "@mui/icons-material/Home";
import ButtonGroup from "@mui/material/ButtonGroup";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { addToCart } from "../actions/cartActions";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Drawer } from "@mui/material";
import axios from "axios";
import Loader from "./Loader";
import { createDelivery, listMyAdresses } from "../actions/deliveryActions";
import { register } from "../actions/userActions";
import ClipLoader from "react-spinners/ClipLoader";
import Header from "./Header/Header";
import Adress from "./utils/Adress/Adress";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import InsideLoader from "./InsideLoader/insideLoader";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { CART_RESET } from "../constants/cartConstants";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import Badge from "@mui/material/Badge";
import { deepOrange, orange } from "@mui/material/colors";
import ButtonLoader from "./ButtonLoader";
import { shippingData } from "./utils/shippingData";
import "./Coupons.css";
import CouponCard from "./CouponCard";
import { ToastContainer, toast } from "react-toastify";
import { listMyCoupons } from "../actions/couponsAction";

import InfoIcon from "@mui/icons-material/Info";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CartScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [qtyLoading, setQtyLoading] = useState(false);
  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAdress } = cart;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, sucess, error, loading: orderCreateLoading } = orderCreate;
  const coupon = "ST45";
  const [couponCode, setCouponCode] = useState("");
  const getAdresses = useSelector((state) => state.getAdresses);
  const { adresses, loading: AdressesLoading } = getAdresses;
  const getCoupons = useSelector((state) => state.getCoupons);
  const { coupons, loading: couponsLoading, error: couponsError } = getCoupons;
  const addDelivery = useSelector((state) => state.addDelivery);
  const {
    delivery,
    sucess: deliverySucess,
    error: deliveryErrorfromBackend,
  } = addDelivery;
  const maxQty = 10;
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const [style, setStyle] = useState({});
  const [adress, setAdress] = useState("");
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [shippingFee, setShippingFee] = useState(true);
  const [postalCode, setpostalCode] = useState();
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [open, setOpen] = useState(false);
  const [deliveryError, setDeliveryError] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [loadingPincode, setLoadingPincode] = useState(false);
  const [adressName, setAdressName] = useState("");
  const [otpDrawer, setOtpDrawer] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountError, setDiscountError] = useState(false);
  const [couponMain, setCouponMainButton] = useState(false);
  const [discountBtnClicked, setDiscontBtnClicked] = useState(false);
  const userRegister = useSelector((state) => state.userRegister);
  const [shippingPrice, setShippingPrice] = useState(0);
  const [showCouponsDiv, setShowCouponsDiv] = useState(false);
  const [couponMessage, setcouponMessage] = useState("");
  const {
    loading: userRegisterLoading,
    error: userRegisterError,
    userInfo: newUserInfo,
  } = userRegister;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOtpDrawer(false);
  };
  const notifyError = (text) => {
    toast.error(text, {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const notifySucess = (text) => {
    toast.success(text, {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  //calculate shipping Price

  //calculate prices
  if (cartItems) {
    cart.itemsPrice = cart.cartItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );
    // cart.shippingPrice = 0;
    cart.taxPrice = 0;
    cart.discountPrice = cartItems
      .reduce((acc, item) => acc + item.qty * item.price * discountAmount, 0)
      .toFixed(2);
    cart.totalPrice =
      Number(cart.itemsPrice) +
      Number(cart.shippingPrice) +
      Number(cart.taxPrice) -
      Number(cart.discountPrice);
  }

  const placeOrderHandler = async () => {
    if (Object.keys(shippingAdress).length !== 0) {
      if (userInfo) {
        await dispatch(
          createOrder({
            orderItems: cartItems,
            shippingAdress: shippingAdress,
            paymentMethod: "Razorpay",
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            discountPrice: cart.discountPrice,
            totalPrice: cart.totalPrice,
          })
        );
        await dispatch({
          type: CART_RESET,
        });
        await dispatch({
          type: ORDER_CREATE_RESET,
        });
      } else {
        setDeliveryError(false);
        handleClickOpen();
      }
    } else {
      setDeliveryError(true);
      handleClickOpen();
    }
  };

  const couponBtnClick = () => {
    if (coupons) {
      coupons.map((element) => {
        if (couponCode == element.name) {
          console.log("Coupon Correct");
          if (cart.totalPrice > element.criteria) {
            setDiscontBtnClicked(true);
            notifySucess("Coupon Applied Sucessfully");
            setDiscountError(false);
            switch (element.typeOfCoupon) {
              case "Delivery":
                setDiscountAmount(0);
                setShippingFee(false);
                cart.shippingPrice = 0;
                setcouponMessage(element.message);
                break;
              case "Percentage":
                setDiscountAmount(element.value);
                setcouponMessage(element.message);
                break;
              case "Amount":
                setDiscountAmount(element.value);
                setcouponMessage(element.message);
                break;
              default:
                break;
            }
          }
        }
      });
    }
  };
  const removeCoupon = () => {
    setDiscountAmount(0);
    setShippingFee(true);
    setCouponCode("");
    setCouponMainButton(false);
    setDiscontBtnClicked(false);
    setDiscountError(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(listMyAdresses());
    dispatch(listMyCoupons());
    if (deliverySucess) {
      dispatch(listMyAdresses());
    }
    if (sucess) {
      navigate(`/order/${order._id}`);
    }
  }, [navigate, sucess, userInfo, userRegister, deliverySucess]);
  return (
    <>
      {orderCreateLoading && <ButtonLoader />}

      <Header />
      <div className="cart-screen">
        <ToastContainer />
        <Drawer
          anchor="left"
          open={showCouponsDiv}
          onClose={() => setShowCouponsDiv(false)}
          PaperProps={{
            sx: {
              backgroundColor: "#3F3D56",
            },
          }}
        >
          <Box p={2} role="presentation" className="adress-enter-drawer-box">
            <div className="content-inside-drawer-add">
              <span
                className="edit-profile-drawer-heading"
                style={{ color: "white" }}
              >
                Coupons List
              </span>
              {/* {deliveryErrorfromBackend && (
                <Alert severity="error">{deliveryErrorfromBackend}</Alert>
              )}
              {deliverySucess && (
                <Alert severity="success">Deliver Adress Added!</Alert>
              )} */}
              {/* {couponsLoading && <Loader />} */}

              {coupons && coupons.map((coup) => <CouponCard data={coup} />)}
            </div>
          </Box>
        </Drawer>
        {/* <div className="coupons-div">
          <div className="coupons-div-inside"></div>
        </div> */}
        {cartItems && cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-inside">
              <img src={CartEmpty} alt="" className="cart-empty" />
              <h1 className="empty-cart-frame">
                Your Cart is Empty, Grab some yummy{" "}
                <span className="orange-color-hp">Farsan's</span>
              </h1>
              <Link className="hp-order-now-btn" to="/menu">
                Grab Now
              </Link>
            </div>
          </div>
        ) : (
          <div className="cart-screen-content">
            {deliveryError ? (
              <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
              >
                <Alert
                  severity="error"
                  className="alert-error-delivery-adress"
                  style={{ fontSize: "18px" }}
                  variant="filled"
                >
                  <AlertTitle>There was some Error</AlertTitle>

                  <strong>Please Select atleast One Delivery Adress!</strong>
                </Alert>
              </Dialog>
            ) : (
              <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                fullWidth="true"
                maxWidth="md"
              >
                <div className="dia-checkout-process">
                  <div className="dia-checkout-process-inner-content">
                    <div className="form-dia-checkout">
                      <span className="dia-checkout-heading">Checkout</span>
                      <TextField
                        id="standard-basic"
                        label="Enter Your Phone Number"
                        variant="standard"
                        fullWidth
                      />
                      <Button
                        style={{
                          backgroundColor: "#474747",
                          fontFamily: "Poppins",
                          margin: "10px 0",
                        }}
                        variant="contained"
                        type="submit"
                        size="large"
                      >
                        Send OTP
                      </Button>
                    </div>

                    <div className="dia-login-area-content">
                      <div className="dia-login-text">
                        Already have an account with us?
                      </div>
                      <div className="login-area-button">
                        <button className="dia-login-button">
                          Login to your account
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog>
            )}

            <div className="left-cart">
              <Adress shippingFee={shippingFee} />
            </div>
            <div className="right-cart">
              <div className="right-cart-inside">
                <span className="right-cart-header">
                  Order Summary(
                  {qtyLoading ? (
                    <InsideLoader />
                  ) : (
                    cartItems.reduce((acc, item) => acc + item.qty, 0)
                  )}{" "}
                  Items)
                </span>
                <div className="content-one-right-order-summary">
                  {cartItems.map((item) => (
                    <div className="content-one-right-cart" key={item.product}>
                      <span
                        className="span-content-one-right-cart-head"
                        style={style}
                      >
                        {item.name} <br />
                      </span>
                      <ButtonGroup
                        variant="outlined"
                        aria-label="outlined primary button group"
                      >
                        <IconButton
                          aria-label="delete"
                          disabled={
                            qtyLoading || item.qty === 10 ? true : false
                          }
                          onClick={async () => {
                            if (item.qty <= maxQty - 1) {
                              setQtyLoading(true);
                              await dispatch(
                                addToCart(
                                  item.product,
                                  Number(item.qty + 1),
                                  item.qtySelected
                                )
                              );
                              setQtyLoading(false);
                            }
                            console.log("Add icon clicked");
                          }}
                        >
                          <AddIcon />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          disabled={qtyLoading ? true : false}
                          onClick={async () => {
                            setQtyLoading(true);
                            if (item.qty > 0) {
                              await dispatch(
                                addToCart(
                                  item.product,
                                  Number(item.qty - 1),
                                  item.qtySelected
                                )
                              );
                              setQtyLoading(false);
                            }
                            if (item.qty <= 1) {
                              removeFromCartHandler(item.product);
                              setQtyLoading(false);
                            }
                            console.log("Add icon clicked");
                          }}
                        >
                          <RemoveIcon />
                        </IconButton>
                      </ButtonGroup>
                      <span className="span-content-one-right-cart-number">
                        x{item.qty}
                      </span>
                      <IconButton
                        aria-label="delete"
                        onClick={() => {
                          removeFromCartHandler(item.product);
                        }}
                      >
                        <DeleteOutlineIcon />
                      </IconButton>

                      <span
                        className="span-content-one-right-cart-price"
                        style={style}
                      >
                        {" "}
                        ₹ {item.price}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="one-right-apply-coupon">
                  {!couponMain && (
                    <Badge
                      badgeContent="Get Upto 50% OFF"
                      color="primary"
                      sx={{
                        "& .MuiBadge-badge": {
                          color: "white",
                          backgroundColor: "#de6000",
                          fontFamily: "Poppins",
                          fontWeight: "400",
                          padding: "8px",
                        },
                      }}
                      className="apply-coupon-order"
                    >
                      <span
                        onClick={() => {
                          setCouponMainButton(true);
                        }}
                      >
                        APPLY COUPON
                      </span>
                    </Badge>
                  )}

                  {couponMain && (
                    <div className="coupon-input-form">
                      <div className="inside-coupon-form">
                        {discountBtnClicked ? (
                          <input
                            style={
                              discountError
                                ? {
                                    border: "1px solid #de0000",
                                  }
                                : {
                                    border: "1px solid #1e9400",
                                  }
                            }
                            type="text"
                            value={couponCode}
                            name=""
                            id=""
                            className="coupon-input"
                            placeholder="ENTER COUPON CODE"
                            onChange={(e) => setCouponCode(e.target.value)}
                            required
                            disabled={discountError ? false : true}
                          />
                        ) : (
                          <input
                            type="text"
                            value={couponCode}
                            name=""
                            id=""
                            className="coupon-input"
                            placeholder="ENTER COUPON CODE"
                            onChange={(e) => setCouponCode(e.target.value)}
                            required
                            disabled={false}
                          />
                        )}

                        {discountBtnClicked &&
                          (discountError ? (
                            <span className="helper-text-coupon">
                              This Coupon Code is Invalid!
                            </span>
                          ) : (
                            <span className="helper-text-coupon-correct">
                              Coupon Applied Sucessfully! {couponMessage}
                            </span>
                          ))}
                      </div>
                      {discountBtnClicked ? (
                        discountError ? (
                          <button
                            type="submit"
                            className="coupon-btn"
                            onClick={couponBtnClick}
                          >
                            Try Again
                          </button>
                        ) : (
                          <>
                            <button
                              type="submit"
                              className="coupon-btn"
                              onClick={couponBtnClick}
                              disabled
                            >
                              Applied
                            </button>
                            <IconButton
                              aria-label="delete"
                              onClick={removeCoupon}
                            >
                              <DeleteOutlineIcon />
                            </IconButton>
                          </>
                        )
                      ) : (
                        <button
                          type="submit"
                          className="coupon-btn"
                          onClick={couponBtnClick}
                        >
                          Apply
                        </button>
                      )}
                    </div>
                  )}
                  <h3
                    onClick={() => {
                      setShowCouponsDiv(true);
                    }}
                    className="view-coupons"
                  >
                    Show Coupons & Deals For You
                  </h3>
                </div>
                <div className="bill-details-cart-order">
                  <div className="bill-details-inside-order">
                    <span className="bill-details-heading">Bill Details</span>
                    <div className="bill-details-inside">
                      <div className="bill-details-inside-content">
                        <span className="span-content-one-right-cart-head">
                          Item Total
                        </span>
                        <span className="span-content-one-right-cart-price">
                          ₹{" "}
                          {cartItems
                            .reduce(
                              (acc, item) => acc + item.qty * item.price,
                              0
                            )
                            .toFixed(2)}
                        </span>
                      </div>

                      <div className="bill-details-inside-content">
                        <span className="span-content-one-right-cart-head">
                          Total Discount
                        </span>
                        <span className="span-content-one-right-cart-price">
                          - ₹{" "}
                          {cartItems
                            .reduce(
                              (acc, item) =>
                                acc + item.qty * item.price * discountAmount,
                              0
                            )
                            .toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <hr />
                    <div className="grand-total-bill">
                      <span className="grand-total-bill-heading">
                        Grand Total
                      </span>
                      <span className="grand-total-bill-amount">
                        ₹{" "}
                        {(
                          cartItems
                            .reduce(
                              (acc, item) => acc + item.qty * item.price,
                              0
                            )
                            .toFixed(2) -
                          cartItems
                            .reduce(
                              (acc, item) =>
                                acc + item.qty * item.price * discountAmount,
                              0
                            )
                            .toFixed(2)
                        ).toFixed(2)}
                        {/* {qtyLoading ? (
                          <InsideLoader />
                        ) : (
                          
                        )} */}
                      </span>
                    </div>

                    <div className="checkout-button">
                      {Object.keys(shippingAdress).length !== 0 && (
                        <button
                          className="proceed-to-checout-btn"
                          variant="contained"
                          size="large"
                          startIcon={<CreditCardTwoToneIcon />}
                          onClick={placeOrderHandler}
                        >
                          PROCEED TO CHECKOUT
                          <ShoppingBasketIcon sx={{ ml: 2 }} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartScreen;
