import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import "./ddp.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAdress,
  listMyAdresses,
  updateAdress,
} from "../../../actions/deliveryActions";
import React, { useEffect, useState } from "react";
import { Drawer, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import Loader from "../../Loader";
import axios from "axios";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import {
  CART_REMOVE_SHIPPING_ADRESS,
  CART_RESET,
} from "../../../constants/cartConstants";
import InfoIcon from "@mui/icons-material/Info";
import CartInner from "../../cartInner";
import moment from "moment";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vw",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#FFFFFF",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 500,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));
const AdressInner = ({
  adress,
  selectedAdress,
  adressSelectorHandler,
  setDeleteAdressSucess,
  shippingFee,
  deliveryMode,
  setDeliveryMode,
  value,
}) => {
  const dispatch = useDispatch();
  const [loadingPincode, setLoadingPincode] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [city, setCity] = useState(adress.city);
  const [postalCode, setpostalCode] = useState(adress.pincode);
  const [state, setState] = useState(adress.state);
  const [country, setCountry] = useState(adress.country);
  const [adressName, setAdressName] = useState(adress.name);

  const [adressFeild, setAdress] = useState(adress.adressOne);
  const [expressShippingFee, setExpressShippingFee] = useState(0);
  const [standardFee, setStandardFee] = useState(0);
  const [expressDates, setExpressDates] = useState(0);
  const [standardDates, setStandardDates] = useState(0);
  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAdress } = cart;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const todayMoment = moment();

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

  const handleExpressCharges = (e) => {
    cart.shippingPrice = 69;
    const id = e.target.id;
    if (id === "express") {
      setDeliveryMode("express");
    }
    if (id === "standard") {
      setDeliveryMode("standard");
    }
  };

  const updateDeliveryAdressForm = (e) => {
    e.preventDefault();
    dispatch(
      updateAdress({
        _id: adress._id,
        name: adressName,
        adressOne: adressFeild,
        pincode: postalCode,
        city: city,
        state: state,
        country: country,
      })
    );
    setIsDrawerOpen(false);
  };
  useEffect(() => {
    if (value === 0) {
      adressSelectorHandler(adress._id);
    }

    switch (adress.city) {
      case "Mumbai":
        setExpressShippingFee(30);
        setStandardFee(30);
        setExpressDates(1);
        setStandardDates(1);
        break;
      case "Gurgaon":
        setExpressShippingFee(90);
        setStandardFee(50);
        setExpressDates(2);
        setStandardDates(3);
        break;
      case "Delhi":
        setExpressShippingFee(90);
        setStandardFee(50);
        setExpressDates(2);
        setStandardDates(3);
        break;
      case "Banglore":
        setExpressShippingFee(90);
        setStandardFee(50);
        setExpressDates(2);
        setStandardDates(3);
        break;
      default:
        setExpressShippingFee(100);
        setStandardFee(60);
        setExpressDates(2);
        setStandardDates(3);
        break;
    }
  }, [shippingFee]);
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <span className="dia-checkout-heading">Select Delivery Mode</span>
          <div className="delivery-div-price">
            <div className="ddp-inside">
              <div
                className={
                  deliveryMode == "standard"
                    ? `ddp-left ddp-selected`
                    : `ddp-left`
                }
                id="standard"
                onClick={handleExpressCharges}
              >
                <img
                  src="https://ik.imagekit.io/ejdxfrhyu/Untitled_design_PDt_S05Hp.png?ik-sdk-version=javascript-1.4.3&updatedAt=1659627028156"
                  alt=""
                  className="express-delivery-image"
                />
                <h1 className="ddp-delivery-title">
                  Standard Delivery ({adress.city})
                </h1>
                <span className="delivery-adress-adress-estimated-delivery">
                  <LocalShippingIcon sx={{ mr: 2 }} />
                  Estimated Delivery By{" "}
                  {`${todayMoment
                    .clone()
                    .add(standardDates, "days")
                    .toString()
                    .slice(0, 15)}`}
                </span>
                <span className="delivery-adress-name">₹ {standardFee}</span>{" "}
              </div>
              <div
                className={
                  deliveryMode == "express"
                    ? `ddp-left ddp-selected`
                    : `ddp-left`
                }
                id="express"
                onClick={handleExpressCharges}
              >
                <img
                  src="https://ik.imagekit.io/ejdxfrhyu/Untitled_design__1__5z0ixg4jb.png?ik-sdk-version=javascript-1.4.3&updatedAt=1659627028141"
                  alt=""
                  className="express-delivery-image"
                />
                <h1 className="ddp-delivery-title">
                  Express Delivery ({adress.city})
                </h1>
                <span className="delivery-adress-adress-estimated-delivery">
                  <LocalShippingIcon sx={{ mr: 2 }} />
                  Estimated Delivery By{" "}
                  {`${todayMoment
                    .clone()
                    .add(expressDates, "days")
                    .toString()
                    .slice(0, 15)}`}
                </span>
                <span className="delivery-adress-name">
                  ₹ {expressShippingFee}
                </span>{" "}
              </div>
            </div>
          </div>
        </Box>
      </Modal>
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Box p={2} role="presentation" className="adress-enter-drawer-box">
          <div className="content-inside-drawer-add">
            <span className="edit-profile-drawer-heading">
              Edit Delivery Address
            </span>
            {/* {deliveryErrorfromBackend && (
              <Alert severity="error">{deliveryErrorfromBackend}</Alert>
            )}
            {deliverySucess && (
              <Alert severity="success">Deliver Adress Added!</Alert>
            )} */}
            <form
              onSubmit={updateDeliveryAdressForm}
              className="add-delivery-adress"
            >
              <TextField
                id="outlined-basic"
                label="Enter Name For Address 
          "
                variant="standard"
                helperText="Home, Work, etc"
                fullWidth
                defaultValue={adressName}
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
                defaultValue={adressFeild}
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
                defaultValue={postalCode}
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
                    defaultValue={city}
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
                    defaultValue={state}
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
                    defaultValue={country}
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
                    Save Address
                  </Button>
                </>
              )}
            </form>
          </div>
        </Box>
      </Drawer>
      <div
        className={
          adress._id == selectedAdress._id
            ? `delivery-adressed-div selectedDiv`
            : `delivery-adressed-div`
        }
        key={adress._id}
        id={adress._id}
        onClick={(e) => {
          adressSelectorHandler(adress._id);
        }}
      >
        <div className="adress-div-inside-flexed">
          <span className="delivery-adress-name">{adress.name}</span>
          <ButtonGroup
            variant="outlined"
            aria-label="outlined primary button group"
          >
            <IconButton
              aria-label="delete"
              disabled={false}
              onClick={() => setIsDrawerOpen(true)}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label="delete"
              disabled={false}
              onClick={() => {
                dispatch({ type: CART_REMOVE_SHIPPING_ADRESS });
                dispatch(deleteAdress(adress._id));
              }}
            >
              <DeleteIcon />
            </IconButton>
          </ButtonGroup>
        </div>
        <br />
        <span className="delivery-adress-adress">{adress.adressOne}</span>{" "}
        <br />
        <span className="delivery-adress-adress">
          {adress.city}, {adress.state}, {adress.country}
        </span>{" "}
        <br />
        <span className="delivery-adress-adress">{adress.pincode}</span>
        <br />
        {adress._id == selectedAdress._id && (
          <span className="delivery-adress-adress-estimated-delivery">
            Estimated Delivery By <br />{" "}
            {deliveryMode === "express"
              ? todayMoment
                  .clone()
                  .add(expressDates, "days")
                  .toString()
                  .slice(0, 15)
              : todayMoment
                  .clone()
                  .add(standardDates, "days")
                  .toString()
                  .slice(0, 15)}
            <HtmlTooltip
              title={
                <React.Fragment>
                  <Typography color="inherit">
                    Standard Delivery Charges are Applied
                  </Typography>
                  <Button
                    variant="outlined"
                    color="success"
                    sx={{ m: 2 }}
                    onClick={handleOpen}
                  >
                    Want Faster Delivery?
                  </Button>
                </React.Fragment>
              }
            >
              <InfoIcon sx={{ ml: 2 }} />
            </HtmlTooltip>
          </span>
        )}
      </div>
    </>
  );
};

export default AdressInner;
