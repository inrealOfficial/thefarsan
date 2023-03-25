import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getOrderDetails,
  orderDeliver,
  orderStageChanger,
  payOrder,
} from "../actions/orderActions";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVERED_RESET,
} from "../constants/orderConstants";
import "./orderScreen.css";
import ClipLoader from "react-spinners/ClipLoader";
import PaymentsIcon from "@mui/icons-material/Payments";
import Header from "./Header/Header";
import Loader from "./Loader";
import InsideLoader from "./InsideLoader/insideLoader";
import CheckoutHeader from "./Header/CheckoutHeader";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import tickmark from "../checkmark.png";
import ButtonLoader from "./ButtonLoader";
import CycleLoader from "./CycleLoader";
import Modal from "@mui/material/Modal";
import DeliveryDiningOutlinedIcon from "@mui/icons-material/DeliveryDiningOutlined";
import { TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vw",
  bgcolor: "background.paper",
  border: "0px solid #000",
  boxShadow: 24,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  p: 4,
};

const OrderScreen = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sdkready, setsdkReady] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const orderPay = useSelector((state) => state.orderPay);
  const { sucess: sucessPay, loading: loadingPay } = orderPay;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [openAdmin, setOpenAdmin] = useState(false);
  const [orderStageValue, setOrderStageValue] = useState(0);
  const orderDelivered = useSelector((state) => state.orderDelivered);
  const { sucess: sucessDeliverOrder, loading: loadingDeliverOrder } =
    orderDelivered;

  const orderStage = useSelector((state) => state.orderStage);
  const { sucess: sucessStageOrder, loading: loadingStageOrder } = orderStage;

  const startRazorPay = async () => {
    setPaymentLoading(true);
    const { data: clientId } = await axios.get(
      "https://app-farsan.herokuapp.com/api/config/razorpay"
    );

    const result = await axios.post(
      "https://app-farsan.herokuapp.com/api/create-order",
      {
        amount: order.totalPrice,
        receipt: order._id,
      }
    );
    setPaymentLoading(false);
    const { amount, id, currency } = result.data;
    var options = {
      key: clientId, // Enter the Key ID generated from the Dashboard
      amount: amount.toString(), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: currency,
      name: order._id,
      description: "Transaction For The Farsan",
      image: "https://i.ibb.co/cTjDFcB/Chetan-s.png",
      order_id: id,
      prefill: {
        name: "The Farsan",
        email: "support@thefarsan.in",
        contact: "7045013337",
      },
      readonly: {
        email: true,
        contact: true,
        name: true,
      },
      theme: {
        color: "#2F2E41",
      },
      handler: function (response) {
        console.log(response);
        dispatch(payOrder(orderId, response));
      },
    };

    setsdkReady(true);
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    if (!order) {
      dispatch(getOrderDetails(orderId));
    } else {
      if (order._id !== orderId) {
        dispatch(getOrderDetails(orderId));
      } else {
        const addRazorPayScript = () => {
          const script = document.createElement("script");
          script.type = "text/javascript";
          script.src = "https://checkout.razorpay.com/v1/checkout.js";
          script.async = true;
          script.onload = async () => {
            setsdkReady(true);
          };
          document.body.appendChild(script);
        };
        if (sucessPay || sucessDeliverOrder) {
          dispatch({ type: ORDER_PAY_RESET });
          dispatch({ type: ORDER_DELIVERED_RESET });
          dispatch(getOrderDetails(orderId));
        } else if (!order.isPaid) {
          if (!window.razerpay) {
            addRazorPayScript();
          } else {
            setsdkReady(true);
          }
        }
      }
    }
    if (order) {
      setOrderStageValue(order.deliveryStage);
    }
  }, [
    dispatch,
    order,
    orderId,
    sucessPay,
    sucessDeliverOrder,
    sucessStageOrder,
  ]);

  const deliverHandler = () => {
    dispatch(orderDeliver(orderId));
  };

  const stageHandler = () => {
    dispatch(orderStageChanger(orderId, orderStageValue));
  };
  return loading ? (
    <div className="loader-div-order">
      <CycleLoader />
      <span className="os-loader-header-order">Fetching Your Order</span>
    </div>
  ) : error ? (
    <h1>{error}</h1>
  ) : (
    <>
      {paymentLoading && <ButtonLoader />}
      <CheckoutHeader />
      <div className="order-screen">
        <div className="order-screen-page">
          <div className="order-screen-left">
            {order.isDelivered && (
              <div className="img-delivered-div">
                <img
                  src="https://ik.imagekit.io/ejdxfrhyu/farsanStamp_ruQoXeoB1.png?ik-sdk-version=javascript-1.4.3&updatedAt=1659424289080"
                  alt=""
                  className="img-delivered-image"
                />
              </div>
            )}

            {userInfo && userInfo.isAdmin && (
              <>
                <Button
                  variant="contained"
                  onClick={() => {
                    setOpenAdmin(true);
                  }}
                >
                  Edit this order
                </Button>
                <Modal
                  open={openAdmin}
                  onClose={() => {
                    setOpenAdmin(false);
                  }}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      Admin Section
                    </Typography>
                    {!order.isDelivered && (
                      <Button
                        variant="contained"
                        onClick={deliverHandler}
                        sx={{ m: 5 }}
                      >
                        Mark Order as delivered
                      </Button>
                    )}
                    <TextField
                      id="standard-basic"
                      label="Enter stage"
                      variant="standard"
                      sx={{ mt: 5 }}
                      defaultValue={orderStageValue}
                      onChange={(e) => {
                        setOrderStageValue(e.target.value);
                      }}
                    />
                    <Button
                      variant="contained"
                      sx={{ mt: 2 }}
                      onClick={stageHandler}
                    >
                      submit stage
                    </Button>
                  </Box>
                </Modal>
              </>

              // <button className="pay-now-razerpay" onClick={deliverHandler}>
              //   Mark as delivered
              // </button>
            )}
            {/* <div className="order-screen-flex-div"> */}
            <div className="os-left-top">
              <span className="os-shipping-header">Shipping Address</span>
              <span className="os-left-adress">
                {order.shippingAdress.adress}, {order.shippingAdress.city}
                <br />
                {order.shippingAdress.state}
                <br />
                {order.shippingAdress.postalCode}
                <br />
                {order.shippingAdress.country}
              </span>
            </div>
            <div className="os-left-bottom">
              <span className="os-shipping-header">Order Items</span>
              {order.orderItems.length === 0 ? (
                <h1>Your Order is empty</h1>
              ) : (
                order.orderItems.map((item) => (
                  <div className="order-items-os-left-bottom">
                    <span className="order-item-name-os">{item.name}</span>
                    <span className="order-item-name-os">
                      <b>{item.qty} x</b>
                    </span>
                    <span className="order-item-name-os">₹ {item.price}</span>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="order-screen-right">
            <div className="os-right-inner">
              <div className="os-right-qrcode">
                <img src={order.qrCode} alt="" />
              </div>

              <span className="order-os-id-heading">ORDER ID: {orderId}</span>

              <div className="order-os-right-inside-content">
                <div className="order-os-right-inner-top">
                  <span className="items-total-os">Items Total</span>
                  <span className="items-total-os">₹ {order.itemsPrice}</span>
                </div>
                <div className="order-os-right-inner-top">
                  <span className="items-total-os">Discount Price</span>
                  <span className="items-total-os">
                    ₹ {order.discountPrice}
                  </span>
                </div>
                <div className="order-os-right-inner-top">
                  <span className="items-total-os">Shipping Total</span>
                  <span className="items-total-os">
                    ₹ {order.shippingPrice}
                  </span>
                </div>
                <div className="order-os-right-inner-top">
                  <span className="items-total-os">Tax</span>
                  <span className="items-total-os">₹ {order.taxPrice}</span>
                </div>
              </div>
              <div className="order-os-right-inside-content">
                <div className="order-os-right-inner-top">
                  <span className="items-total-os-grand-total">
                    GRAND TOTAL
                  </span>
                  <span className="items-total-os-grand-total">
                    ₹ {order.totalPrice}
                  </span>
                </div>
              </div>
              {/* <button className="not-paid-button-os">NOT PAID</button> */}
              {order.isPaid && (
                <button className="not-paid-button-os-sucess">
                  <img src={tickmark} alt="" className="tickmark-image" /> Paid
                  Sucessfully
                </button>
              )}

              {!order.isPaid && (
                <>
                  {loadingPay && <InsideLoader />}
                  {!sdkready ? (
                    <InsideLoader />
                  ) : (
                    <>
                      <button
                        className="pay-now-razerpay"
                        onClick={startRazorPay}
                      >
                        Pay Now
                      </button>
                      <img
                        src="https://cdn.razorpay.com/static/assets/pay_methods_branding.png"
                        alt=""
                        className="pay-now-image"
                      />
                    </>
                  )}
                </>
              )}
              <Link to="/help" className="order-issues">
                <span>having issues with order?</span>
              </Link>
              {order.isPaid && (
                <Link to={`/track/${orderId}`} className="order-issues-tracker">
                  <DeliveryDiningOutlinedIcon sx={{ mr: 2 }} />
                  <span>Track Your Order</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderScreen;
