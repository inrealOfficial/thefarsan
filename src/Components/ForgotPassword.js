import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { forgotPassword, login } from "../actions/userActions";
import Snackbar from "./utils/Snackbar";
import LogoImage from "../farsan.svg";
import { buildUrl } from "cloudinary-build-url";
import Loader from "./Loader";
import { motion } from "framer-motion";
import Footer from "./Footer/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { USER_LOGOUT } from "../constants/userConstants";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const [loginStyle, setLoginStyle] = useState({
    backgroundImage: "../rangoli.jpg",
  });

  const notify = (text) => {
    toast.error(text, {
      position: "bottom-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const sucessNotify = (text) => {
    toast.success(text, {
      position: "bottom-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const userForgotPassword = useSelector((state) => state.userForgotPassword);
  let { loading, error, sucess } = userForgotPassword;
  const userLogin = useSelector((state) => state.userLogin);
  let { userInfo } = userLogin;
  const redirect = window.location.search
    ? window.location.search.split("=")[1]
    : " ";
  console.log(redirect);
  useEffect(() => {
    if (userInfo) {
      navigate(`/${redirect}`);
      console.log(redirect);
    }
    if (error) {
      notify(error);
      dispatch({ type: USER_LOGOUT });
    }
    if (sucess) {
      sucessNotify("Reset Password has been sent sucessfuly");
      window.setTimeout(() => {
        navigate("/login");
        dispatch({ type: USER_LOGOUT });
      }, 3000);
    }
  }, [userInfo, error, sucess]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };
  const src = buildUrl("rangoli_e3kzwu", {
    cloud: {
      cloudName: "dhljctjzx",
    },
  });
  return (
    <>
      <motion.div className="login-page">
        <div className="login-page-content">
          <motion.div className="login-page-left">
            <img src={LogoImage} alt="" className="login-logo-image" />
            <div className="login-form-content">
              {loading ? (
                <div className="inside-loaders">
                  <Loader />
                </div>
              ) : (
                <form
                  action=""
                  onSubmit={submitHandler}
                  className="login-form-content-form"
                >
                  <ToastContainer />

                  <input
                    type="email"
                    value={email}
                    name=""
                    id=""
                    className="email-login-page"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />

                  <button type="submit" className="login-btn">
                    Send Reset Password Link
                  </button>
                </form>
              )}
            </div>
          </motion.div>
          <div className="login-page-right">
            <div
              className="login-page-right-content"
              style={{ backgroundImage: `url("${src}")` }}
            ></div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ForgotPassword;
