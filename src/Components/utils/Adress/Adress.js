import React, { useEffect, useState } from "react";
import "./Adress.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { saveShippingAdress } from "../../../actions/cartActions";
import Loader from "../../Loader";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import "./otp.css";
import {
  createDelivery,
  listMyAdresses,
} from "../../../actions/deliveryActions";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { register } from "../../../actions/userActions";
import Alert from "@mui/material/Alert";
import { Drawer } from "@mui/material";
import Box from "@mui/material/Box";
import axios from "axios";
import OtpInput from "react-otp-input";
import AdressInner from "./AdressInner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  createOTPHandler,
  verifyOTPHandler,
} from "../../../actions/otpActions";
import ButtonLoader from "../../ButtonLoader";
import {
  OTP_CREATE_RESET,
  OTP_VERIFY_RESET,
} from "../../../constants/otpConstants";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const Adress = ({ shippingFee }) => {
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const {
    loading: userRegisterLoading,
    error: userRegisterError,
    userInfo: newUserInfo,
  } = userRegister;
  const newGuestRegister = async (e) => {
    e.preventDefault();
    dispatch(
      register({
        name: name,
        email: email,
        isGuest: true,
        phoneNumber: Number(phonNumber),
        isPhoneNumberVerified: true,
        password: password,
      })
    );
    setOtpDrawer(false);
  };
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setpostalCode] = useState();
  const [state, setState] = useState("");
  const [phonNumber, setPhonNumber] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOTP] = useState();
  const [country, setCountry] = useState("");
  const [adressName, setAdressName] = useState("");
  const [adress, setAdress] = useState("");
  const [otpActive, setOTPActive] = useState(false);
  const [loadingPincode, setLoadingPincode] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpDrawer, setOtpDrawer] = useState(false);
  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAdress } = cart;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const getAdresses = useSelector((state) => state.getAdresses);
  const { adresses, loading: AdressesLoading } = getAdresses;
  const [deleteAdressSucess, setDeleteAdressSucess] = useState(false);
  const [selectedAdress, setSelectedAdress] = useState({});
  const deleteAdresses = useSelector((state) => state.deleteAdresses);
  const { sucess: sucessDeleteAdress, loading: loadingDeleteAdress } =
    deleteAdresses;

  const updateAdress = useSelector((state) => state.updateAdress);
  const { sucess: adressUpdateSucess, loading: adressUpdateLoading } =
    updateAdress;
  const [adCount, setAdCount] = useState(0);
  const createOTP = useSelector((state) => state.createOTP);
  const [deliveryMode, setDeliveryMode] = useState("standard");
  const {
    sucess: otpCreateSucess,
    loading: otpCreateLoading,
    error: otpCreateError,
    otp: otpCreateContent,
  } = createOTP;

  const verifyOTP = useSelector((state) => state.verifyOTP);
  const {
    sucess: otpVerifySucess,
    loading: otpVerifyLoading,
    error: otpVerifyError,
    otp: otpCVeifyContent,
  } = verifyOTP;
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
  const handlePostalCode = async (postalCode) => {
    if (postalCode.toString().length === 6) {
      setLoadingPincode(true);
      console.log(postalCode);
      const details = await axios.get(
        `https://api.postalpincode.in/pincode/${postalCode}`
      );
      console.log(details.data[0].PostOffice[0].District);
      setCity(details.data[0].PostOffice[0].District);
      setState(details.data[0].PostOffice[0].State);
      setCountry(details.data[0].PostOffice[0].Country);
      setLoadingPincode(false);
    }
  };
  const addNewDeliveryAdress = (e) => {
    e.preventDefault();
    dispatch(
      createDelivery({
        name: adressName,
        adressOne: adress,
        pincode: Number(postalCode),
        city: city,
        state: state,
        country: country,
      })
    );
    setIsDrawerOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
    setOtpDrawer(false);
  };

  const handleOTP = async (e) => {
    e.preventDefault();

    if (otp.toString().length < 5) {
      notifyError("Please Enter Complete OTP");
    } else {
      await dispatch(verifyOTPHandler(phonNumber, otp));
    }
  };
  const openOTPDrawer = async () => {
    if (phonNumber.toString().length < 9) {
      alert("Some error");
    } else {
      await dispatch(createOTPHandler(phonNumber));
      // setOtpDrawer(true);
    }
  };
  const adressSelectorHandler = (id) => {
    const Adressid = id;
    const adress = adresses.find((x) => x._id == Adressid);
    if (adress) {
      adresses.map((x) => {
        if (x._id === Adressid) {
          if (shippingFee) {
            if (deliveryMode === "express") {
              switch (x.city) {
                case "Mumbai":
                  cart.shippingPrice = 30;
                  break;
                case "Gurgaon":
                  cart.shippingPrice = 90;
                  break;
                case "Delhi":
                  cart.shippingPrice = 90;
                  break;
                case "Banglore":
                  cart.shippingPrice = 90;
                  break;
                default:
                  cart.shippingPrice = 100;
                  break;
              }
            }
            if (deliveryMode === "standard") {
              switch (x.city) {
                case "Mumbai":
                  cart.shippingPrice = 30;
                  break;
                case "Gurgaon":
                  cart.shippingPrice = 50;
                  break;
                case "Delhi":
                  cart.shippingPrice = 50;
                  break;
                case "Banglore":
                  cart.shippingPrice = 50;
                  break;
                default:
                  cart.shippingPrice = 60;
                  break;
              }
            }
          }
          setSelectedAdress(x);
          dispatch(
            saveShippingAdress({
              id: Number(x._id),
              adress: x.adressOne,
              city: x.city,
              postalCode: x.pincode,
              state: x.state,
              country: x.country,
            })
          );
        }
      });
    }
  };
  const addDelivery = useSelector((state) => state.addDelivery);
  const {
    delivery,
    sucess: deliverySucess,
    error: deliveryErrorfromBackend,
  } = addDelivery;
  useEffect(() => {
    dispatch(listMyAdresses());
    if (deliverySucess) {
      dispatch(listMyAdresses());
    }
    if (otpVerifySucess) {
      notifySucess("OTP Verfied Sucessfully");
      dispatch({ type: OTP_VERIFY_RESET });
      setOTPActive(false);
      setOtpDrawer(true);
    }
    if (otpVerifyError) {
      notifyError("Incorrect OTP");
      dispatch({ type: OTP_VERIFY_RESET });
    }

    if (otpCreateSucess) {
      notifySucess("OTP Generated");
      setOTPActive(true);
      dispatch({ type: OTP_CREATE_RESET });
    }
    if (otpCreateError) {
      notifyError("There was some internal server error");
      dispatch({ type: OTP_CREATE_RESET });
    }
  }, [
    listMyAdresses,
    dispatch,
    sucessDeleteAdress,
    adressUpdateSucess,
    otpVerifySucess,
    otpVerifyError,
    otpCreateSucess,
    otpCreateError,
    shippingFee,
  ]);
  return (
    <>
      <div
        className="otp-div"
        style={otpActive ? { left: "0" } : { left: "-5000px" }}
      >
        <div className="otp-content">
          {otpVerifyLoading ? (
            <>
              <div class="lds-spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </>
          ) : (
            <form
              action="
        "
              onSubmit={handleOTP}
              className="otp-form"
            >
              <span className="dia-checkout-heading" style={{ color: "white" }}>
                {" "}
                Enter OTP
              </span>
              <OtpInput
                className="otp-input"
                value={otp}
                onChange={(otp) => setOTP(otp)}
                inputStyle="otp-input"
                numInputs={6}
                containerStyle="otp-input"
                isInputNum="true"
              />
              <Button
                style={{
                  backgroundColor: "#FA9B3D",
                  fontFamily: "Poppins",
                }}
                variant="contained"
                type="submit"
                size="large"
              >
                Submit
              </Button>
            </form>
          )}
          <ToastContainer />
        </div>
      </div>
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Box p={2} role="presentation" className="adress-enter-drawer-box">
          <div className="content-inside-drawer-add">
            <span className="edit-profile-drawer-heading">
              Add New Delivery Address
            </span>
            {deliveryErrorfromBackend && (
              <Alert severity="error">{deliveryErrorfromBackend}</Alert>
            )}
            {deliverySucess && (
              <Alert severity="success">Deliver Adress Added!</Alert>
            )}
            <form
              onSubmit={addNewDeliveryAdress}
              className="add-delivery-adress"
            >
              <TextField
                id="outlined-basic"
                label="Enter Name For Address 
          "
                variant="standard"
                helperText="Home, Work, etc"
                fullWidth
                sx={{ mt: 2, mb: 3 }}
                required
                onChange={(e) => {
                  setAdressName(e.target.value);
                }}
              />
              <TextField
                id="outlined-basic"
                label="Enter Address 
          "
                variant="standard"
                helperText="Flat, Housing no., Building, Apartment, Area, street, sector"
                fullWidth
                sx={{ mt: 2, mb: 3 }}
                required
                onChange={(e) => {
                  setAdress(e.target.value);
                }}
              />
              <TextField
                id="outlined-basic"
                label="Pincode
          "
                type="number"
                variant="standard"
                helperText="Please Enter your pincode"
                fullWidth
                sx={{ mt: 2, mb: 3 }}
                required
                onChange={(e) => {
                  setpostalCode(e.target.value);
                  handlePostalCode(e.target.value);
                }}
              />
              {loadingPincode ? (
                <Loader />
              ) : (
                <>
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    id="outlined-basic"
                    variant="standard"
                    label="City"
                    helperText="Please Enter your pincode"
                    fullWidth
                    sx={{ mt: 2, mb: 3 }}
                    required
                    disabled
                    value={city}
                  />
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    id="outlined-basic"
                    variant="standard"
                    label="State"
                    helperText="Please Enter your pincode"
                    fullWidth
                    sx={{ mt: 2, mb: 3 }}
                    required
                    disabled
                    value={state}
                  />
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    id="outlined-basic"
                    variant="standard"
                    label="Country"
                    helperText="Please Enter your pincode"
                    fullWidth
                    sx={{ mt: 2, mb: 3 }}
                    required
                    disabled
                    value={country}
                  />
                  <Button
                    style={{
                      backgroundColor: "#FA9B3D",
                      fontFamily: "Poppins",
                    }}
                    variant="contained"
                    type="submit"
                    size="large"
                  >
                    Add Address
                  </Button>
                </>
              )}
            </form>
          </div>
        </Box>
      </Drawer>

      <Dialog
        open={otpDrawer}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        fullWidth="true"
        maxWidth="md"
      >
        <div className="dia-checkout-process">
          <div className="dia-checkout-process-inner-content">
            <div className="form-dia-checkout">
              <span className="dia-checkout-heading"> Enter Details</span>
              <form onSubmit={newGuestRegister} className="enter-details-form">
                {userRegisterError && (
                  <Alert variant="filled" severity="info">
                    {userRegisterError}
                  </Alert>
                )}
                {userRegisterLoading && (
                  <Alert variant="filled" severity="info">
                    Loading
                  </Alert>
                )}

                <TextField
                  id="standard-basic"
                  label="Please Enter Your Name"
                  variant="standard"
                  fullWidth
                  sx={{
                    m: 1,
                    width: "100%",
                  }}
                  required
                  onChange={(e) => setname(e.target.value)}
                />
                <TextField
                  id="standard-basic"
                  label="Please Enter Your Email"
                  variant="standard"
                  fullWidth
                  type="email"
                  sx={{
                    m: 1,
                    width: "100%",
                  }}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  id="standard-basic"
                  label="Please Enter Password"
                  variant="standard"
                  fullWidth
                  type="password"
                  sx={{
                    m: 1,
                    width: "100%",
                  }}
                  required
                  onChange={(e) => setpassword(e.target.value)}
                />

                <Button
                  style={{
                    backgroundColor: "#474747",
                    fontFamily: "Poppins",
                    margin: "20px 0",
                  }}
                  type="submit"
                  variant="contained"
                  size="large"
                >
                  Complete your Order
                </Button>
              </form>
            </div>
          </div>
        </div>
      </Dialog>
      {userInfo ? (
        <div className="left-cart-content">
          <span className="left-cart-title">Select a delivery address</span>
          <div className="form-content">
            <div className="checout-form-content-inside">
              {AdressesLoading ? (
                <div className="inside-loaders">
                  <Loader />
                </div>
              ) : (
                adresses &&
                adresses.map((adress, index) => (
                  <AdressInner
                    value={index}
                    adress={adress}
                    shippingFee={shippingFee}
                    selectedAdress={selectedAdress}
                    adressSelectorHandler={adressSelectorHandler}
                    setDeleteAdressSucess={setDeleteAdressSucess}
                    deliveryMode={deliveryMode}
                    setDeliveryMode={setDeliveryMode}
                  />
                ))
              )}
            </div>
            <Button
              style={{
                backgroundColor: "#3F3D56",
                fontFamily: "Poppins",
                marginTop: "20px",
              }}
              variant="contained"
              size="large"
              startIcon={<AddIcon />}
              onClick={() => setIsDrawerOpen(true)}
            >
              Add Address
            </Button>
            <div className="left-cart-delivery-adress">
              {/* <img
                   src={deliveryAdress}
                   alt=""
                   className="left-cart-adress-image"
                 /> */}
            </div>
          </div>
        </div>
      ) : (
        <div className="dia-checkout-process">
          {otpCreateLoading && <ButtonLoader />}
          <div className="dia-checkout-process-inner-content">
            <div className="form-dia-checkout">
              <span className="dia-checkout-heading">Checkout</span>
              <TextField
                id="standard-basic"
                label="Enter Your Phone Number"
                variant="standard"
                fullWidth
                type="number"
                required
                onChange={(e) => {
                  setPhonNumber(e.target.value);
                }}
              />
              <Button
                style={{
                  backgroundColor: "#474747",
                  fontFamily: "Poppins",
                  margin: "10px 0",
                }}
                variant="contained"
                type="submit"
                size="large"
                onClick={openOTPDrawer}
              >
                Send OTP
              </Button>
            </div>

            <div className="dia-login-area-content">
              <div className="dia-login-text">
                Already have an account with us?
              </div>
              <div className="login-area-button">
                <Link style={{ textDecoration: "none" }} to="/login">
                  <button className="dia-login-button">
                    Login to your account
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Adress;
