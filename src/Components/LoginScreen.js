import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../actions/userActions";
import LogoImage from "../farsan.svg";
import { buildUrl } from "cloudinary-build-url";
import Loader from "./Loader";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { USER_LOGOUT } from "../constants/userConstants";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoginScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
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
  const userLogin = useSelector((state) => state.userLogin);
  let { loading, error, userInfo } = userLogin;
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
  }, [userInfo, error]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
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
            <Link to="/">
              {" "}
              <img src={LogoImage} alt="" className="login-logo-image" />
            </Link>

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
                  <span className="no-account-register">
                    No Account? <Link to="/register">register here</Link>
                  </span>
                  <button type="submit" className="login-btn">
                    Login
                  </button>
                  <Link className="having-issues" to="/troubleshoot">
                    Having Trouble?
                  </Link>
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

export default LoginScreen;
