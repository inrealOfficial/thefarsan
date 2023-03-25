import "./HomePageNew.css";
import "../../ourMenu.css";
import deliveryOne from "../../../undraw_starry_window_re_0v82.svg";
import deliveryTwo from "../../../undraw_on_the_way_re_swjt.svg";
import deliveryThree from "../../../undraw_order_delivered_re_v4ab.svg";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../../actions/productActions";
import { useEffect, useState } from "react";
import ProductShowcase from "../../productShowcase";
import { Link } from "react-router-dom";
import FarsanLoader from "../../FarsanLoader/FarsanLoader";
import Header from "../../Header/Header";
import { motion } from "framer-motion";
const HomePage = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const { loading, error, products } = productList;
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(listProducts());
  }, [dispatch]);

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      trasnsition: {
        delay: 1.5,
        duration: 1.5,
      },
    },
    exit: {
      x: "-100vw",
      trasnsition: {
        ease: "easeInOut",
      },
    },
  };

  const checkCartButton = (cartItems, currProductID, price) => {
    if (cartItems) {
      const existItem = cartItems.find((x) => x.product === currProductID);
      if (existItem) {
        return {
          check: true,
          existPrice: existItem.price,
          existQty: existItem.qtySelected,
        };
      } else {
        return {
          check: false,
          existPrice: price,
          existQty: "oneKg",
        };
      }
    }
  };
  return (
    <>
      {pageLoading ? (
        <FarsanLoader />
      ) : (
        <>
          <Header />
          <motion.div
            className="homepage"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="homepage-content">
              <div className="hp-left">
                <div className="hp-left-content">
                  <div className="hp-header">
                    The Best
                    <br />
                    <span className="orange-color-hp"> Farsan’s</span> in the
                    Country
                  </div>

                  <span className="hp-para">
                    "We make sure, you get one of the best{" "}
                    <span className="hp-quality-bold">Quality</span> Farsan’s{" "}
                    <br className="homepage-breakpoint" />
                    at your door step."
                  </span>
                  <Link to="/menu" className="hp-order-now-btn">
                    Order Now
                  </Link>
                </div>
              </div>
              <div className="hp-right">
                <div className="hp-right-content"></div>
              </div>
            </div>
          </motion.div>
          <div className="page2">
            <div className="page2-content">
              <div className="p2-top">
                <span className="p2-top-heading">WHAT WE SERVE</span>
                <span className="p2-top-main-heading">
                  Your Favourite <span className="orange-color-hp">Farsan</span>{" "}
                  <br className="homepage-breakpoint" />
                  Delivery Partner
                </span>
              </div>
              <div className="p2-bottom">
                <div className="p2-bottom-content">
                  <div className="p2-bottom-content-div">
                    <img src={deliveryOne} alt="" />
                    <span className="p2-bottom-content-heading">
                      Easy To Order
                    </span>
                    <span className="p2-bottom-content-paragraph">
                      You only need a few steps in ordering your favourite
                      farsan
                    </span>
                  </div>
                  <div className="p2-bottom-content-div">
                    <img src={deliveryTwo} alt="" />
                    <span className="p2-bottom-content-heading">
                      Fastest Delivery
                    </span>
                    <span className="p2-bottom-content-paragraph">
                      Delivery that is always ontime even faster
                    </span>
                  </div>
                  <div className="p2-bottom-content-div">
                    <img src={deliveryThree} alt="" />
                    <span className="p2-bottom-content-heading">
                      Best Quality
                    </span>
                    <span className="p2-bottom-content-paragraph">
                      Not only fast for us quality is also number one
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="page3">
            <div className="page3-content">
              <div className="p3-top">
                <span className="p2-top-heading">OUR MENU</span>
              </div>
              <div className="p3-bottom">
                <div className="p3-bottom-content">
                  {loading ? (
                    <FarsanLoader />
                  ) : error ? (
                    <h1>{error}</h1>
                  ) : (
                    products
                      .slice(0, 5)
                      .map((product) => (
                        <ProductShowcase
                          data={product}
                          buttonChecker={checkCartButton(
                            cartItems,
                            product._id,
                            product.priceList[`oneKg`].price
                          )}
                        />
                      ))
                  )}
                </div>
                <div className="p3-bottom-show-more-btn">
                  <Link className="hp-order-now-btn" to="/menu">
                    Show more
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default HomePage;
