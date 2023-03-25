import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import "./trackOrder.css";
import { getOrderDetails } from "../../../actions/orderActions";
import Header from "../../Header/Header";
import { Step, StepLabel, Stepper } from "@mui/material";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import CycleLoader from "../../CycleLoader";
const TrackOrder = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const [activeStep, setActiveStep] = useState(0);
  useEffect(() => {
    if (!order) {
      dispatch(getOrderDetails(orderId));
    } else {
      if (order._id !== orderId) {
        dispatch(getOrderDetails(orderId));
      } else {
      }
    }
    if (order) {
      setActiveStep(order.deliveryStage);
    }
  }, [dispatch, order, orderId]);
  const valueOfSx = {
    "& .MuiStepLabel-root .Mui-completed": {
      color: "green", // circle color (COMPLETED)
    },
    "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel": {
      color: "grey.500",
      fontSize: "10px",
      fontFamily: "Poppins", // Just text label (COMPLETED)
    },
    "& .MuiStepLabel-root .Mui-active": {
      color: "#DE6000", // circle color (ACTIVE)
    },
    "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel": {
      color: "#DE6000",
      fontSize: "12px",
      fontFamily: "Poppins",
      // Just text label (ACTIVE)
    },
    "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
      fill: "white",
      // circle's number (ACTIVE)
    },
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
      <Header />
      <div className="track-order">
        <div className="track-order-inside">
          {/* <h1 className="header-tracking">
            <DeliveryDiningIcon sx={{ fontSize: "48px", mr: 2 }} />
            Track Your Order
          </h1> */}
          <div className="header-tracking-inside">
            <div className="hti-top">
              <div className="hti-top-left">
                <div className="hti-qr">
                  <img src={order.qrCode} alt="" />
                </div>
                <div className="order-id">
                  <h1 className="hti-order-id">
                    <span className="roboto">ORD{orderId} </span>
                  </h1>
                </div>
                <div className="hti-stepper">
                  <Stepper activeStep={activeStep} alternativeLabel>
                    <Step sx={valueOfSx}>
                      {order.isPaid ? (
                        <StepLabel>Order Accepted</StepLabel>
                      ) : (
                        <StepLabel>Awaiting Payment</StepLabel>
                      )}
                    </Step>
                    <Step sx={valueOfSx}>
                      <StepLabel>Collecting Farsan</StepLabel>
                    </Step>
                    <Step sx={valueOfSx}>
                      <StepLabel>
                        Shipped To {order.shippingAdress.city}
                      </StepLabel>
                    </Step>
                    <Step sx={valueOfSx}>
                      <StepLabel>Out For Delivery</StepLabel>
                    </Step>
                    <Step sx={valueOfSx}>
                      <StepLabel>Delivered</StepLabel>
                    </Step>
                  </Stepper>
                </div>
                <div className="hti-bottom">
                  <button className="hti-get-help">GET HELP</button>
                  {order.isPaid ? (
                    order.isDelivered ? (
                      <button className="hti-get-help-delivered">
                        DELIVERED
                      </button>
                    ) : (
                      <button className="hti-get-help-pending">
                        ORDER IN PROGRESS
                      </button>
                    )
                  ) : (
                    <Link
                      to={`/order/${orderId}`}
                      className="hti-get-help-pending"
                    >
                      Complete Payment
                    </Link>
                  )}
                </div>
              </div>
            </div>
            <div className="h1-top-left">
              <img
                src="https://i.ibb.co/hFJrYxp/original-102df333671c420178c9b647868183d2-removebg-preview.png"
                alt=""
              />
            </div>
            {/* <div className="hti-bottom">
              <button className="hti-get-help">GET HELP</button>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default TrackOrder;
