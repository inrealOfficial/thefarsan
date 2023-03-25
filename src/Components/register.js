import "./register.css";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { register } from "../actions/userActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Snackbar from "./utils/Snackbar";
import LogoImage from "../thefarsan.png";
import { buildUrl } from "cloudinary-build-url";
import Loader from "./Loader";
import { ToastContainer, toast } from "react-toastify";
const RegisterScreen = () => {
  const navigate = useNavigate();
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const src = buildUrl("rangoli_e3kzwu", {
    cloud: {
      cloudName: "dhljctjzx",
    },
  });
  const { loading, error, userInfo } = userRegister;
  const redirect = window.location.search
    ? window.location.search.split("=")[1]
    : "/";
  useEffect(() => {
    if (userInfo) {
      //navigate to redirect
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);
  const showMessage = (message) => {
    return <Snackbar message={message} />;
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      notifyError("Passowrds do not match");
    } else {
      dispatch(
        register({
          name: name,
          email: email,
          password: password,
          phoneNumber: phoneNumber,
        })
      );
    }
  };
  const [open, setOpen] = useState(true);
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

  return (
    <div className="register-page">
      <ToastContainer />
      <div className="register-page-content">
        <div className="login-page-left">
          <img src={LogoImage} alt="" className="login-logo-image" />
          <div className="login-form-content">
            {loading ? (
              <div className="inside-loaders">
                <Loader />
              </div>
            ) : (
              <form action="" onSubmit={submitHandler}>
                {error && <Snackbar message={error} />}
                <input
                  type="text"
                  value={name}
                  name=""
                  id=""
                  className="email-login-page"
                  placeholder="Name"
                  onChange={(e) => setname(e.target.value)}
                  required
                />
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
                <input
                  type="number"
                  name=""
                  id=""
                  className="email-login-page"
                  placeholder="Phone Number"
                  required
                  onChange={(e) => setPhoneNumber(Number(e.target.value))}
                />
                <input
                  type="password"
                  value={password}
                  name=""
                  id=""
                  className="email-login-page"
                  placeholder="Password"
                  onChange={(e) => setpassword(e.target.value)}
                  required
                />
                <input
                  type="password"
                  value={confirmPassword}
                  name=""
                  id=""
                  className="email-login-page"
                  placeholder="Confirm Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <span className="no-account-register">
                  Already have an account?{" "}
                  <Link className="no-account-register-text" to="/login">
                    Login here
                  </Link>
                </span>
                <button type="submit" className="login-btn">
                  Sign up
                </button>
              </form>
            )}
          </div>
        </div>
        <div className="login-page-right">
          <div
            className="login-page-right-content"
            style={{ backgroundImage: `url("${src}")` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
