import "./Footer.css";
import FarsanWhite from "../../thefarsanwhite.png";
import { Link } from "react-router-dom";
import { useEffect } from "react";
const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-content-top">
          <div className="ft-one">
            <img src={FarsanWhite} alt="" className="footer-logo" />
          </div>

          <div className="ft-two">
            <div className="ft-two-inside">
              <span className="ft-two-header"> ADDRESS</span>
              <Link className="ft-links" to="/aboutus">
                Krishna Kunj, Grant Road East,
              </Link>
              <Link className="ft-links" to="/aboutus">
                Bharat Nagar, Grant Road
              </Link>
              <Link className="ft-links" to="/aboutus">
                Mumbai, Maharashtra 400007
              </Link>
              <Link className="ft-links" to="/aboutus">
                India
              </Link>
            </div>
          </div>
          <div className="ft-two">
            <div className="ft-two-inside">
              <span className="ft-two-header">CONTACT</span>
              <Link to="/help" className="ft-links" target="_blank">
                <span>Help & Support</span>
              </Link>
              <Link to="/help" className="ft-links" target="_blank">
                {" "}
                <span>Partner With Us</span>
              </Link>
              <Link to="/ridewithus" className="ft-links" target="_blank">
                <span>Ride With Us</span>
              </Link>
              <a
                href="https://linktr.ee/thefarsan"
                className="ft-links"
                target="_blank"
              >
                <span>Our Socials</span>
              </a>
            </div>
          </div>
          <div className="ft-two">
            <div className="ft-two-inside">
              <span className="ft-two-header">LEGAL</span>
              <Link to="/termsofservice" className="ft-links" target="_blank">
                <span>Terms & Conditions</span>
              </Link>
              <Link to="/refundpolicy" className="ft-links" target="_blank">
                <span>Refund & Cancellation</span>
              </Link>
              <Link to="/privacypolicy" className="ft-links" target="_blank">
                <span>Privacy Policy</span>
              </Link>
              <Link to="/useOfSite" className="ft-links" target="_blank">
                <span>Use of Site</span>
              </Link>
            </div>
          </div>
          <div className="ft-three">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
              alt=""
              className="footer-logo-app"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt=""
              className="footer-logo-app"
            />
          </div>
        </div>
        <div className="footer-content-bottom">
          <div className="ft-content-bottom-text">
            <span className="ft-bottom-text">
              Copyright 2022, The Farsan’s Pvt. Ltd.
            </span>
            <span className="ft-bottom-text">All rights reserved.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
