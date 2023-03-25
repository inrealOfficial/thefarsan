import { useEffect, useState } from "react";
import "./Snackbar.css";

const Snackbar = ({ message }) => {
  const [show, setShow] = useState("show");
  window.setTimeout(() => {
    setShow("");
  }, 3000);
  return (
    <div id="snackbar" className={show}>
      {message}.
    </div>
  );
};

export default Snackbar;
