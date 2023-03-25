import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { resetPassword } from "../actions/userActions";
import { USER_LOGOUT } from "../constants/userConstants";
import Header from "./Header/Header";
import "./reset.css";
const ResetPassword = () => {
  const { id, token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const userResetPassword = useSelector((state) => state.userResetPassword);
  let { loading, error, sucess } = userResetPassword;
  const userLogin = useSelector((state) => state.userLogin);
  let { userInfo } = userLogin;
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
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      notify("Passwords do no match");
    } else {
      dispatch(resetPassword(id, token, password));
    }
  };
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
      sucessNotify("Password Sucessfully Reseted");
      window.setTimeout(() => {
        navigate("/login");
        dispatch({ type: USER_LOGOUT });
      }, 3000);
    }
  }, [userInfo, error, sucess]);
  return (
    <>
      <Header />
      <div className="reset-password">
        <h1 className="reset-password-page">Reset Password</h1>
        <form
          action=""
          onSubmit={submitHandler}
          className="reset-password-form"
        >
          <ToastContainer />

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
          <button type="submit" className="login-btn">
            Reset
          </button>
        </form>
      </div>
    </>
  );
};

export default ResetPassword;
