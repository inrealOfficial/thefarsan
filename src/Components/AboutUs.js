import Header from "./Header/Header";
import "./AboutUs.css";
import { useEffect } from "react";
import LogoImage from "../farsan.svg";
const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Header />
      <div className="about-us">
        <div className="about-us-inside">
          <h1 className="aboutUs-header">About Us</h1>
          <p className="about-para">
            It’s time to ditch the cliched brands and embrace something more
            delicious, old and worthy for you.
          </p>
          <p className="about-para">
            Our motive is to make you eat the best quality of Farsan at just one
            click, it’s a whole soul one stop store for all types of farsan. We
            wanted to introduce old traditional snacks to the upcoming
            generation. Farsans are a very important part of Gujarati cuisine,
            Marathi cuisine and Sindhi cuisine, wherein a wide variety of them
            are prepared on special occasions and to entertain guests, and are
            also enjoyed with tea.
          </p>
          <p className="about-para">
            So, we present you a platform with a variety of farsan where one can
            buy fresh and best quality of farsan . We believe food is a right,
            not a luxury, so we aim to deliver the best quality of food at the
            most affordable prices.
          </p>
          <p className="about-para">
            We keep upgrading and adding the variety of farsan to our collection
            on a time-to-time basis, so stay loyal to us and we promise never to
            disappoint you. With fast shipping and cash-on-delivery, just to
            make it easier for you, we don’t see a reason why you shouldn’t be
            glued to Thefarsan already!
          </p>
          {/* <img src={LogoImage} alt="" className="about-us-image" /> */}
        </div>
      </div>
    </>
  );
};

export default AboutUs;
