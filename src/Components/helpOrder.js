import MopedIcon from "@mui/icons-material/Moped";
import GavelIcon from "@mui/icons-material/Gavel";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import PolicyIcon from "@mui/icons-material/Policy";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Header from "./Header/Header";
import "./helpOrder.css";
import { useEffect } from "react";
import { listMyOrders } from "../actions/orderActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../actions/userActions";
import Loader from "./Loader";
import { Link } from "@mui/material";
const HelpOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { orders, loading: loadingOrders, error: errorOrders } = orderListMy;
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      }
    }
  }, [dispatch, navigate, userInfo, user]);
  return (
    <>
      <Header />
      <div className="help-order">
        <div className="help-order-inside">
          <h1 className="help-header">Help and Support Portal</h1>
          <p className="help-order-para">
            Please Select the order you need help with.
          </p>
          <div className="help-inner-order">
            {loadingOrders ? (
              <div className="inside-loaders">
                <Loader />
              </div>
            ) : errorOrders ? (
              <h1>{errorOrders}</h1>
            ) : (
              orders.map((order) => (
                <div className="help-order-div">
                  <div className="help-order-div-left">
                    <img src={order.qrCode} alt="" className="order-help-qr" />

                    <div className="side-content-order-help">
                      <h1 className="order-id-help">OR{order._id}</h1>
                      <p className="orderItems-order-help ">
                        {" "}
                        {order.orderItems.map(
                          (items) => `${items.qty}x ${items.name}, `
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="help-order-div-right">
                    <button
                      className="help-order-div-button track"
                      onClick={() => {
                        navigate(`/track/${order._id}`);
                      }}
                    >
                      TRACK ORDER
                    </button>

                    <button className="help-order-div-button-help">
                      GET HELP
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HelpOrder;
