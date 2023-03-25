import "../register.css";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Loader from "../Loader";
import { getUserDetails, updateUser } from "../../actions/userActions";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { USER_UPDATE_RESET } from "../../constants/userConstants";
import Header from "../Header/Header";
const UserEditScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isAdmin, setisAdmin] = useState(false);
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    sucess: sucessUpdate,
  } = userUpdate;

  useEffect(() => {
    if (sucessUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      navigate("/admin/userlist");
    } else {
      if (!user.name || user._id !== id) {
        dispatch(getUserDetails(id));
      } else {
        setname(user.name);
        setEmail(user.email);
        setisAdmin(user.isAdmin);
      }
    }
  }, [dispatch, id, user, sucessUpdate]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: id, name, email, isAdmin }));
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action2 = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  return (
    <>
      <Header />
      <div className="register-page">
        <div className="register-page-content">
          <div className="login-top-content">
            <span className="login-header">Edit User</span>
          </div>
          <div className="login-form-content">
            {loadingUpdate && <Loader />}
            {errorUpdate && <h1>{errorUpdate}</h1>}

            {loading ? (
              <Loader />
            ) : error ? (
              <h1>{error}</h1>
            ) : (
              <form action="">
                <input
                  type="text"
                  value={name}
                  name=""
                  id=""
                  className="email-login-page"
                  placeholder="Name"
                  onChange={(e) => setname(e.target.value)}
                />
                <input
                  type="email"
                  value={email}
                  name=""
                  id=""
                  className="email-login-page"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Is Admin?"
                  checked={isAdmin}
                  size="large"
                  onChange={(e) => setisAdmin(e.target.checked)}
                />
                {/* <input
                type="checkbox"
                value="true"
                name="isAdmin"
                id="isAdmin"
                className="email-login-page"
                onChange={(e) => console.log(e.target.value)}
              />
              <label htmlFor="isAdmin">Is Admin?</label> */}
                <button
                  type="submit"
                  className="login-btn"
                  onClick={submitHandler}
                >
                  Update User
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserEditScreen;
