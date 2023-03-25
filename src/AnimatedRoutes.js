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
import { AnimatePresence } from "framer-motion";
import NotFound from "./Components/utils/404/notfound";
import RefundPolicy from "./Components/Screens/RefundPolicy/RefundPolicy";
import UseOfSite from "./Components/Screens/UseOfSite/useOfSite";
import RideWithUs from "./Components/Screens/RideWithUs/ridewithUS";
import PrivacyPolicy from "./Components/Screens/PrivacyPolicy/privacy";
import OrderListScreen from "./Components/admin/orderListScreen";
const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/admin/userlist" element={<UserListScreen />}></Route>
        <Route path="/admin/orderlist" element={<OrderListScreen />}></Route>
        <Route
          path="/admin/productList"
          element={<ProductListScreen />}
        ></Route>
        <Route path="/admin/user/:id/edit" element={<UserEditScreen />}></Route>
        <Route
          path="/product/user/:id/edit"
          element={<ProductListScreen />}
        ></Route>
        <Route path="*" element={<NotFound />}></Route>
        <Route path="/menu" element={<OurMenu />}></Route>
        <Route path="/aboutUs" element={<AboutUs />}></Route>
        <Route path="/troubleshoot" element={<TroubleShoot />}></Route>
        <Route path="/help" element={<Help />}></Route>
        <Route path="/helpwithorder" element={<HelpOrder />}></Route>
        <Route path="/contact" element={<ContactUs />}></Route>
        <Route path="/cart" element={<CartScreen />}></Route>
        <Route path="/login" element={<LoginScreen />}></Route>
        <Route path="/register" element={<RegisterScreen />}></Route>
        <Route path="/edit" element={<EditProfile />}></Route>
        <Route path="/termsofservice" element={<TOS />}></Route>
        <Route path="/refundpolicy" element={<RefundPolicy />}></Route>
        <Route path="/useOfSite" element={<UseOfSite />}></Route>
        <Route path="/privacypolicy" element={<PrivacyPolicy />}></Route>
        <Route path="/order/:orderId" element={<OrderScreen />}></Route>
        <Route path="/track/:orderId" element={<TrackOrder />}></Route>
        <Route path="/forgot" element={<ForgotPassword />}></Route>
        <Route path="/chat" element={<Chat />}></Route>
        <Route path="/reset/:id/:token" element={<ResetPassword />}></Route>
        <Route path="/ridewithus" element={<RideWithUs />}></Route>
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
