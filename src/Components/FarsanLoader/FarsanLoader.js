import FarsanLoaderImage from "../../ChetanLoading.gif";
import "./FarsanLoader.css";
const FarsanLoader = () => {
  return (
    <div className="farsan-loader">
      <img src={FarsanLoaderImage} alt="" className="farsan-loader-image" />
    </div>
  );
};

export default FarsanLoader;
