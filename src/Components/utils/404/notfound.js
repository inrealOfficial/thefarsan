import Header from "../../Header/Header";
import "./notfound.css";
import NotFoundImg from "./notFound2.svg";

const NotFound = () => {
  return (
    <>
      <Header />
      <div className="not-found">
        <img src={NotFoundImg} alt="" className="notfoundimg" />
        <h1 className="not-found-header">Page Not Found</h1>
      </div>
    </>
  );
};

export default NotFound;
