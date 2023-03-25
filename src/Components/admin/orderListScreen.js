import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Loader from "../Loader";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { listUsers, deleteUser } from "../../actions/userActions";
import DoneIcon from "@mui/icons-material/Done";
import { green, red } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./userListScreen.css";
import Header from "../Header/Header";
import { deleteOrder, listOrders } from "../../actions/orderActions";
import InfoIcon from "@mui/icons-material/Info";
const OrderListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;
  const userLogiin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogiin;
  const orderDelete = useSelector((state) => state.orderDelete);
  const { sucess: sucessDelete } = orderDelete;
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, sucessDelete, userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteOrder(id));
    }
  };
  return (
    <>
      <Header />
      <div className="list-users-screen">
        <div className="list-user-inside">
          <h1>Orders</h1>
          {loading ? (
            <Loader />
          ) : error ? (
            <h1>{error}</h1>
          ) : (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 100 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell align="right">USER</TableCell>
                    <TableCell align="right">DATE</TableCell>
                    <TableCell align="right">TOTAL</TableCell>
                    <TableCell align="right">PAID</TableCell>
                    <TableCell align="right">DELIVERED</TableCell>
                    <TableCell align="right">DETAILS</TableCell>
                    <TableCell align="right">DELETE</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((user) => (
                    <TableRow
                      key={user._id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {user._id}
                      </TableCell>
                      <TableCell align="right">
                        {user.user && user.user.name}
                      </TableCell>
                      <TableCell align="right">
                        {user.createdAt.substring(0, 10)}
                      </TableCell>
                      <TableCell align="right">{user.totalPrice}</TableCell>
                      <TableCell align="right">
                        {user.isPaid ? (
                          <DoneIcon sx={{ color: green[800] }} />
                        ) : (
                          <CloseIcon sx={{ color: red[800] }} />
                        )}
                      </TableCell>
                      <TableCell align="right">
                        {user.isDelivered ? (
                          <DoneIcon sx={{ color: green[800] }} />
                        ) : (
                          <CloseIcon sx={{ color: red[800] }} />
                        )}
                      </TableCell>
                      <TableCell align="right">
                        <Link
                          to={`/order/${user._id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <IconButton aria-label="delete" size="large">
                            <InfoIcon fontSize="inherit" />
                          </IconButton>
                        </Link>
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          aria-label="delete"
                          size="large"
                          onClick={() => {
                            deleteHandler(user._id);
                          }}
                        >
                          <DeleteIcon fontSize="inherit" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
      </div>
    </>
  );
};

export default OrderListScreen;
