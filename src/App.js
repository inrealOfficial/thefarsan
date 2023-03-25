import logo from "./logo.svg";
import "./App.css";
import HomePage from "./Components/Screens/HomePage/HomePage";
import Header from "./Components/Header/Header";
import Hp2 from "./Components/hp2";
import SelectItem from "./Components/Select";
import OurMenu from "./Components/ourMenu";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import CartScreen from "./Components/cart";
import LoginScreen from "./Components/LoginScreen";
import RegisterScreen from "./Components/register";
import EditProfile from "./Components/editProfile";
import OrderScreen from "./Components/orderScreen";
import UserListScreen from "./Components/admin/userListScreen";
import UserEditScreen from "./Components/admin/userEditScreen";
import ContactUs from "./Components/Screens/ContactUs";
import Footer from "./Components/Footer/Footer";
import TOS from "./Components/Screens/TermsOfService/TermsOfService";
import Help from "./Components/Screens/HelpSupport/help";
import TroubleShoot from "./Components/Screens/Troubleshoot/troubleshoot";
import HeaderBottom from "./Components/Header/HeaderBottom";
import ForgotPassword from "./Components/ForgotPassword";
import ResetPassword from "./Components/ResetPassword";
import ProductListScreen from "./Components/admin/productListScreen";
import TrackOrder from "./Components/Screens/TrackOrder/trackOrder";
import HelpOrder from "./Components/helpOrder";
import Chat from "./ChatSystem/chat";
import AboutUs from "./Components/AboutUs";
import AnimatedRoutes from "./AnimatedRoutes";

function App() {
  return (
    <div className="App">
      <Router>
        <AnimatedRoutes />
        <Footer />
        <HeaderBottom />
      </Router>

      {/* <SelectItem /> */}

      {/* <HomePage /> */}
    </div>
  );
}

export default App;
