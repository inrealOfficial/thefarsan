import "./ContactUs.css";
import ContactImage from "../../undraw_contact_us_re_4qqt.svg";
import Header from "../Header/Header";
import contact from "../../contact.jpg";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import CallIcon from "@mui/icons-material/Call";
import { Link } from "react-router-dom";
const ContactUs = () => {
  return (
    <>
      <Header />
      <div className="contact-us">
        <div className="contact-us-inside">
          <div className="contact-us-left">
            <img src={contact} alt="" className="contact-us-image" />
          </div>
          <div className="contact-us-right">
            <h1 className="cu-right-heading">Get in touch!</h1>
            <h3 className="cu-right-inner-heading">
              For any queries, reach out to us:
            </h3>
            <div className="inside-cu-content">
              <AlternateEmailIcon />
              <a
                className="cu-contact-links"
                href="mailto:support@thefarsan.in"
              >
                support@thefarsan.in
              </a>
            </div>
            <div className="inside-cu-content">
              <CallIcon />
              <a className="cu-contact-links">+91 - 7042813171</a>
            </div>

            <span className="cu-or-between">or</span>
            <h3 className="cu-need-help-with-order">
              Need Help Regarding an{" "}
              <Link className="cu-order-bold" to="/helpwithorder">
                {" "}
                order?
              </Link>
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
