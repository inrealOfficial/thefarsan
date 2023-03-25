import "./Header.css";
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
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import hamburger from "./../../hamburger.png";
import close from "./../../cancel.png";
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartQty = useSelector((state) => state.cart);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { cartItems } = cartQty;
  const [headeractive, setHeaderActive] = useState(false);
  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="header">
      <div className="header-content responsive">
        <div className="header-content-left">
          <Link to="/">
            {" "}
            <img src={LogoImage} alt="Header Logo" />
          </Link>
        </div>
        <div className="header-content-right">
          <Link to="/" style={{ textDecoration: "none" }}>
            {" "}
            <span className="header-element">Home</span>
          </Link>
          <Link to="/menu" style={{ textDecoration: "none" }}>
            {" "}
            <span className="header-element">Our Farsan's</span>
          </Link>
          <Link to="/contact" style={{ textDecoration: "none" }}>
            {" "}
            <span className="header-element">Contact Us</span>
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
                    <Link to="/admin/createEmail" className="underline_right">
                      Create Email
                    </Link>
                  </div>
                </li>
              </div>
            </>
          )}
          <Tooltip title="Continue To Your Cart" followCursor>
            <Link to="/cart">
              <Badge
                badgeContent={cartItems ? cartItems.length : 0}
                color="error"
                style={{
                  color: "#000",
                }}
                className="badge-content"
              >
                <LocalMallOutlinedIcon color="white" />
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
          <span>Contact Us</span>
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

export default Header;
