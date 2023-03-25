import { useState } from "react";
import "./CouponCard.css";

const CouponCard = ({ data }) => {
  const [coupontType, setCouponType] = useState(data.typeOfCoupon);
  if (!data.custom) {
    return (
      <div class="card">
        <div class="main">
          <div class="co-img">
            <img
              src="https://ik.imagekit.io/ejdxfrhyu/Chetan_s_Kp-cYfPB1.png?ik-sdk-version=javascript-1.4.3&updatedAt=1659261282597"
              alt=""
              className="coupon-image"
            />
          </div>
          <div class="vertical"></div>
          {coupontType === "Percentage" && (
            <div class="content">
              <h2>The Farsan</h2>
              <h1>
                10%<span>OFF</span>
              </h1>
              <p>{data.description}</p>
            </div>
          )}
          {coupontType === "Amount" && (
            <div class="content">
              <h2>The Farsan</h2>
              <h1>
                ₹2000<span>OFF</span>
              </h1>
              <p>{data.description}</p>
            </div>
          )}
          {coupontType === "Delivery" && (
            <div class="content">
              <h2>The Farsan</h2>
              <h1>
                Free<span>Delivery</span>
              </h1>
              <p>{data.description}</p>
            </div>
          )}
        </div>
        <div class="copy-button">
          <input id="copyvalue" type="text" readonly value={data.name} />
          <button onclick="copyIt()" class="copybtn">
            COPY
          </button>
        </div>
      </div>
    );
  }
};

export default CouponCard;
