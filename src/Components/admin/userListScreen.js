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
const UserListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;
  const userLogiin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogiin;
  const userDelete = useSelector((state) => state.userDelete);
  const { sucess: sucessDelete } = userDelete;
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, sucessDelete, userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteUser(id));
    }
  };
  return (
    <>
      <Header />
      <div className="list-users-screen">
        <div className="list-user-inside">
          <h1>Users</h1>
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
                    <TableCell align="right">EMAIL</TableCell>
                    <TableCell align="right">ADMIN</TableCell>
                    <TableCell align="right">BUTTONS</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
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
                      <TableCell align="right">{user.email}</TableCell>
                      <TableCell align="right">
                        {user.isAdmin ? (
                          <DoneIcon sx={{ color: green[800] }} />
                        ) : (
                          <CloseIcon sx={{ color: red[800] }} />
                        )}
                      </TableCell>
                      <TableCell align="right">
                        <Link
                          to={`/admin/user/${user._id}/edit`}
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

export default UserListScreen;
