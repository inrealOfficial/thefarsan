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
import { deleteProduct, listProducts } from "../../actions/productActions";
import DoneIcon from "@mui/icons-material/Done";
import { green, red } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./userListScreen.css";
import Header from "../Header/Header";
const ProductListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const productDeleteReducer = useSelector(
    (state) => state.productDeleteReducer
  );
  const {
    loading: loadingDelete,
    error: errorDelete,
    sucess: sucessDelete,
  } = productDeleteReducer;
  const userLogiin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogiin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo, sucessDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteProduct(id));
    }
  };
  return (
    <>
      <Header />
      <div className="list-users-screen">
        <div className="list-user-inside">
          <h1>Products</h1>
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
                    <TableCell align="right">NAME</TableCell>
                    <TableCell align="right">PRICE</TableCell>
                    <TableCell align="right">Image</TableCell>
                    <TableCell align="right">BUTTONS</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((user) => (
                    <TableRow
                      key={user._id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {user._id}
                      </TableCell>
                      <TableCell align="right">{user.name}</TableCell>
                      <TableCell align="right">
                        {user.priceList.oneKg.price},
                        {user.priceList.twoKg.price},
                        {user.priceList.twofiveG.price},
                        {user.priceList.fiveHunderedG.price}
                      </TableCell>
                      <TableCell align="right">{user.image}</TableCell>
                      <TableCell align="right">
                        <Link
                          to={`/admin/product/${user._id}/edit`}
                          style={{ textDecoration: "none" }}
                        >
                          <IconButton aria-label="delete" size="large">
                            <EditIcon fontSize="inherit" />
                          </IconButton>
                        </Link>

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

export default ProductListScreen;
