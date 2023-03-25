import "./editProfile.css";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import Alert from "@mui/material/Alert";
import { listMyOrders } from "../actions/orderActions";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Loader from "./Loader";
import CloseIcon from "@mui/icons-material/Close";
import { green, red } from "@mui/material/colors";
import ClipLoader from "react-spinners/ClipLoader";
import Snackbar from "./utils/Snackbar";
import Header from "./Header/Header";
import { ToastContainer, toast } from "react-toastify";
import ButtonLoader from "./ButtonLoader";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import CheckIcon from "@mui/icons-material/Check";
function createData(id, date, total, paid, del, details) {
  return { id, date, total, paid, del, details };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];
const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { sucess, loading: userUpdateLoading } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { orders, loading: loadingOrders, error: errorOrders } = orderListMy;
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      } else {
        setname(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, navigate, userInfo, user]);
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      notifyError("Passwords do not match");
      setIsDrawerOpen(false);
    } else {
      await dispatch(updateUserProfile({ id: user._d, name, email, password }));
      await dispatch({ type: USER_UPDATE_PROFILE_RESET });
      setIsDrawerOpen(false);
    }
  };

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
    <>
      {loading && <ButtonLoader />}
      <Header />
      <div className="edit-profile">
        <ToastContainer />
        <div className="edit-profile-content">
          <div className="top-edit-profile">
            <div className="top-edit-profile-content">
              <span className="edit-profile-header">{user.name}</span>
              <div className="edit-profile-email-password">
                <span className="edit-profile-number">{user.phoneNumber}</span>
                <span className="edit-profile-email">{user.email}</span>
              </div>
            </div>

            <span
              className="header-element-button"
              onClick={() => setIsDrawerOpen(true)}
            >
              Edit Profile
            </span>
            <Drawer
              anchor="right"
              open={isDrawerOpen}
              onClose={() => setIsDrawerOpen(false)}
            >
              <Box width="500px" p={2} role="presentation">
                <span className="edit-profile-drawer-heading">
                  Edit Profile
                </span>
                {userUpdateLoading ? (
                  <div className="inside-loaders">
                    <Loader />
                  </div>
                ) : (
                  <>
                    {error && notifyError(error)}
                    {sucess && notifySucess("User Updated Sucessfully")}
                    <TextField
                      id="outlined-basic"
                      label="Name"
                      variant="standard"
                      defaultValue={name}
                      fullWidth
                      helperText="Edit your name"
                      sx={{ mt: 2, mb: 3 }}
                      onChange={(e) => setname(e.target.value)}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Phone Number"
                      variant="standard"
                      fullWidth
                      helperText="Edit your phone number"
                      sx={{ mb: 3 }}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Email"
                      defaultValue={email}
                      variant="standard"
                      fullWidth
                      helperText="Edit your email"
                      sx={{ mb: 3 }}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Enter New Password"
                      variant="standard"
                      fullWidth
                      type="password"
                      helperText="Edit your password"
                      sx={{ mb: 3 }}
                      onChange={(e) => setpassword(e.target.value)}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Confirm New Password"
                      variant="standard"
                      fullWidth
                      type="password"
                      sx={{ mb: 3 }}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <Button
                      style={{
                        backgroundColor: "#FA9B3D",
                        fontFamily: "Poppins",
                      }}
                      variant="contained"
                      type="submit"
                      size="large"
                      onClick={submitHandler}
                    >
                      UPDATE
                    </Button>
                  </>
                )}
              </Box>
            </Drawer>
          </div>
          <div className="bottom-edit-profile-content">
            <div className="bottom-edit-profile-content-inner">
              <div className="bottom-edit-profile-header">
                <span className="bottom-edit-profile-header-heading">
                  Orders
                </span>
                {/* <span className="bottom-edit-profile-header-heading">
                  Payments
                </span>
                <span className="bottom-edit-profile-header-heading">
                  Settings
                </span> */}
              </div>
              <div className="bottom-order-list-payment">
                {loadingOrders ? (
                  <div className="inside-loaders"></div>
                ) : errorOrders ? (
                  <h1>{errorOrders}</h1>
                ) : (
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 100 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>ID</TableCell>
                          <TableCell align="right">DATE</TableCell>
                          <TableCell align="right">TOTAL</TableCell>
                          <TableCell align="right">PAID</TableCell>
                          <TableCell align="right">DELIVERED</TableCell>
                          <TableCell align="right">DETAILS</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {orders.map((order) => (
                          <TableRow
                            key={order._id}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {order._id}
                            </TableCell>
                            <TableCell align="right">
                              {order.createdAt.substring(0, 10)}
                            </TableCell>
                            <TableCell align="right">
                              {order.totalPrice}
                            </TableCell>
                            <TableCell align="right">
                              {order.isPaid ? (
                                <CheckIcon sx={{ color: green[500] }} />
                              ) : (
                                <CloseIcon sx={{ color: red[500] }} />
                              )}
                            </TableCell>
                            <TableCell align="right">
                              {order.isDelivered ? (
                                <CheckIcon sx={{ color: green[500] }} />
                              ) : (
                                <CloseIcon sx={{ color: red[500] }} />
                              )}
                            </TableCell>
                            <TableCell align="right">
                              <Link
                                to={`/order/${order._id}`}
                                style={{ textDecoration: "none" }}
                              >
                                <Button
                                  style={{
                                    backgroundColor: "white",
                                    fontFamily: "Poppins",
                                    color: "black",
                                  }}
                                  variant="contained"
                                  type="submit"
                                  size="large"
                                >
                                  DETAILS
                                </Button>
                              </Link>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
