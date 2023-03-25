import LogoImage from "../../thefarsan.png";
import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { useState } from "react";
import { logout } from "../../actions/userActions";
import { Link, useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import "./CheckoutHeader.css";
import hamburger from "./../../hamburger.png";
import close from "./../../cancel.png";
const CheckoutHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartQty = useSelector((state) => state.cart);
  const userLogin = useSelector((state) => state.userLogin);
  const [headeractive, setHeaderActive] = useState(false);
  const { userInfo } = userLogin;
  const { cartItems } = cartQty;
  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <div className="header-checkout">
      <div className="header-content-checkout responsive">
        <div className="header-content-left-checkout">
          <img src={LogoImage} alt="Header Logo" />
          <span className="header-checkout-heading">CHECKOUT</span>
        </div>
        <div className="header-content-right-checkout">
          <Link to="/" style={{ textDecoration: "none" }}>
            {" "}
            <span className="header-element-checkout">Home</span>
          </Link>
          <Link to="/menu" style={{ textDecoration: "none" }}>
            {" "}
            <span className="header-element-checkout">Our Farsan's</span>
          </Link>
          {userInfo ? (
            <>
              <div className="ham" id="ham">
                <li className="navbar-dropdown">
                  <span className="header-element-profile">
                    {userInfo.name} <KeyboardArrowDownIcon sx={{ m: 1 }} />
                  </span>
                  <div className="dropdown">
                    <Link to="/edit" className="underline_right">
                      Profile
                    </Link>
                    <a onClick={logoutHandler} className="underline_right">
                      Logout
                    </a>
                  </div>
                </li>
              </div>
            </>
          ) : (
            <Link to="/login" style={{ textDecoration: "none" }}>
              {" "}
              <span className="header-element">Login</span>
            </Link>
          )}
          {userInfo && userInfo.isAdmin && (
            <>
              <div className="ham" id="ham">
                <li className="navbar-dropdown">
                  <span className="header-element-profile">
                    Admin <KeyboardArrowDownIcon sx={{ m: 1 }} />
                  </span>
                  <div className="dropdown">
                    <Link to="/admin/userlist" className="underline_right">
                      Users
                    </Link>
                    <Link to="/admin/productlist" className="underline_right">
                      Products
                    </Link>
                    <Link to="/admin/orderlist" className="underline_right">
                      Orders
                    </Link>
                  </div>
                </li>
              </div>
            </>
          )}
          <Link to="/login" style={{ textDecoration: "none" }}>
            {" "}
            <span className="header-element-checkout">Help</span>
          </Link>
          <Tooltip title="Continue To Your Cart" followCursor>
            <Link to="/cart">
              <Badge
                badgeContent={cartItems ? cartItems.length : 0}
                color="error"
                style={{
                  color: "#000",
                  margin: "0 50px",
                }}
                className="badge-content"
              >
                <ShoppingCartIcon color="white" />
              </Badge>
            </Link>
          </Tooltip>
          {/* <span className="header-element-button">Sell with us</span> */}
        </div>
        <a
          href=""
          class="icon"
          onClick={(e) => {
            e.preventDefault();
            if (headeractive === false) {
              setHeaderActive(true);
            } else {
              setHeaderActive(false);
            }
          }}
        >
          <img src={hamburger} alt="" className="icon" />
        </a>
      </div>
      <div
        className="header-content-right-inside-responsive"
        style={headeractive ? { top: "0px" } : { top: "2000px" }}
      >
        <div className="img-close">
          <img
            src={close}
            alt=""
            className="icon"
            onClick={(e) => {
              if (headeractive === false) {
                setHeaderActive(true);
              } else {
                setHeaderActive(false);
              }
            }}
          />
        </div>
        <Link
          to="/"
          style={{ textDecoration: "none" }}
          className="header-element-responsive"
        >
          {" "}
          <span>Home</span>
        </Link>
        <Link
          to="/menu"
          style={{ textDecoration: "none" }}
          className="header-element-responsive"
        >
          {" "}
          <span>Our Farsan's</span>
        </Link>
        <Link
          to="/contact"
          style={{ textDecoration: "none" }}
          className="header-element-responsive"
        >
          {" "}
          <span>Help</span>
        </Link>
        {userInfo ? (
          <>
            <span className="header-element-responsive">{userInfo.name}</span>
            <Link
              to="/edit"
              style={{ textDecoration: "none" }}
              className="header-element-responsive"
            >
              {" "}
              <span>Profile</span>
            </Link>
            <a
              onClick={logoutHandler}
              style={{ textDecoration: "none" }}
              className="header-element-responsive"
            >
              {" "}
              <span>Logout</span>
            </a>
          </>
        ) : (
          <Link
            to="/login"
            style={{ textDecoration: "none" }}
            className="header-element-responsive"
          >
            {" "}
            <span>Login</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default CheckoutHeader;
