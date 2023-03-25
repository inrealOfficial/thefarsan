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
const HeaderBottom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartQty = useSelector((state) => state.cart);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { cartItems } = cartQty;
  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <div className="header-bottom">
      <div className="header-bottom-inside">
        <h1 className="header-bottom-inside">Continue to Cart</h1>
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
              <LocalMallOutlinedIcon style={{ color: "white" }} />
            </Badge>
          </Link>
        </Tooltip>
      </div>
    </div>
  );
};

export default HeaderBottom;
