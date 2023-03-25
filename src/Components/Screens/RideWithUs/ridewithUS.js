import Header from "../../Header/Header";
import "./ridewithus.css";

const RideWithUs = () => {
  return (
    <>
      <Header />
      <div className="ridewithus">
        <h1 className="ridewithus-header">Ride With Us</h1>
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSc3her_zNFaicwhw-2C6gtUA7NfnCWXP423DuaCXMFLlxkniw/viewform?embedded=true"
          frameborder="0"
          marginheight="0"
          marginwidth="0"
          className="google-iframe"
        >
          Loading…
        </iframe>
      </div>
    </>
  );
};

export default RideWithUs;
