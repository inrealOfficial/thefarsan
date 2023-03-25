import Header from "../../Header/Header";
import "./help.css";
import help from "./help.png";
import MopedIcon from "@mui/icons-material/Moped";
import GavelIcon from "@mui/icons-material/Gavel";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import PolicyIcon from "@mui/icons-material/Policy";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Link } from "react-router-dom";
const Help = () => {
  return (
    <>
      <Header />
      <div className="help-page">
        <div className="help-page-inside">
          <h1 className="help-header">Help and Support Portal</h1>
          <div className="help-inner">
            <div className="help-inner-left">
              <img src={help} alt="" className="help-inner-left-image" />
            </div>
            <div className="help-inner-right">
              <Link className="help-elements-div" to="/helpwithorder">
                <MopedIcon sx={{ fontSize: "34px", mr: 2 }} />
                <span className="help-elements">Help With orders</span>
              </Link>
              <Link className="help-elements-div" to="/troubleshoot">
                <AccountBoxIcon sx={{ fontSize: "34px", mr: 2 }} />
                <span className="help-elements">Account Related Issues</span>
              </Link>
              <Link className="help-elements-div" to="/">
                <HelpCenterIcon sx={{ fontSize: "34px", mr: 2 }} />
                <span className="help-elements">General Questions</span>
              </Link>
              <Link className="help-elements-div" to="/termsofservice">
                <PolicyIcon sx={{ fontSize: "34px", mr: 2 }} />
                <span className="help-elements">
                  Legal, Terms & Conditions, Refund Policy
                </span>
              </Link>
              <Link className="help-elements-div" to="/">
                <ChatBubbleIcon sx={{ fontSize: "34px", mr: 2 }} />
                <span className="help-elements">Start a Live Chat</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Help;
