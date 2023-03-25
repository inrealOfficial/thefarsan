import { motion } from "framer-motion";
import { buildUrl } from "cloudinary-build-url";
import { useState } from "react";
import Loader from "../../Loader";
import { Link } from "react-router-dom";

const TroubleShoot = () => {
  const src = buildUrl("rangoli_e3kzwu", {
    cloud: {
      cloudName: "dhljctjzx",
    },
  });
  const [loading, setloading] = useState(false);
  return (
    <>
      <motion.div className="login-page">
        <div className="login-page-content">
          <motion.div className="login-page-left">
            <h1 className="troubleshoot-heading">Troubleshoot</h1>
            <div className="login-form-content">
              {loading ? (
                <div className="inside-loaders">
                  <Loader />
                </div>
              ) : (
                <div className="troubleshoot-links">
                  <Link to="/forgot" className="troubleshoot-elements">
                    Forgot password?
                  </Link>
                  <Link to="/" className="troubleshoot-elements">
                    Forgot Email?
                  </Link>
                  <Link to="/help" className="troubleshoot-elements">
                    facing other issues
                  </Link>
                  <Link to="/login" className="troubleshoot-elements">
                    Login
                  </Link>
                  <Link to="/register" className="troubleshoot-elements">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
          <div className="login-page-right">
            <div
              className="login-page-right-content"
              style={{ backgroundImage: `url("${src}")` }}
            ></div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default TroubleShoot;
