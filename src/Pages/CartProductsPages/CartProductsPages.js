import React from "react";
import "./CartProductsPages.css";
import { useContext } from "react";
import { AuthContext } from "../../Context/UserContext";
import { useEffect } from "react";
import { useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdFavoriteBorder } from "react-icons/md";
import Loading from "./../../CommonComponents/Loading/Loading";
const CartProductsPages = () => {
  const { user } = useContext(AuthContext);
  const [cartproducts, setcartproducts] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(user);

  useEffect(() => {
    setTimeout(() => {
      fetch(`${process.env.REACT_APP_URL}/cartproduct?email=${user?.email}`)
        .then((res) => res.json())
        .then((jsonData) => {
          setcartproducts(jsonData);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch data:", error);
          setLoading(false);
        });
    }, 2000);
  }, [user?.email]);

  console.log(cartproducts);
  const handleincress = () => {};
  const handledecress = () => {};
  const handledelete = (product) => {
    fetch(`${process.env.REACT_APP_URL}/cartproduct/${product?._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        const remingproduct = cartproducts?.filter(
          (rproduct) => rproduct?._id !== product?._id
        );
        setcartproducts(remingproduct);
        if (data?.deletedCount > 0) {
          // setdelete(true);
        }
      });
  };

  return (
    <div className="cartproduct-container">
      {loading ? (
        <Loading></Loading>
      ) : (
        <div className="cartproduct-row-col">
          <div className="row">
            <div className="col col-12 col-lg-8 col-md-12 col-sm-12 cartproduct-left">
              <div className="cart-all-select">
                <div className="all-select-button-con">
                  <button></button>
                  <p>Select All ({cartproducts?.length} items)</p>
                </div>
                <RiDeleteBin5Line className="cart-delete-icon"></RiDeleteBin5Line>
              </div>
              <div className="cart-product-con">
                {cartproducts?.map((product) => (
                  <div className="cart-product">
                    <button className="select-a-cart-btn"></button>
                    <img
                      className="cart-image"
                      src={product?.Product_image}
                      alt="not"
                    />
                    <div className="cart-product-info">
                      <h6>{product?.product_name}</h6>
                      <p>{product?.brand}</p>
                    </div>
                    <div>
                      <h5>Tk: {product?.product_price}</h5>
                      <div className="favarite-delete">
                        <MdFavoriteBorder className="cart-delete1"></MdFavoriteBorder>
                        <button onClick={() => handledelete(product)}>
                          <RiDeleteBin5Line className="cart-delete"></RiDeleteBin5Line>
                        </button>
                      </div>
                    </div>
                    <div className="number-input">
                      <button onClick={handleincress}>+</button>
                      <span>1</span>
                      <button onClick={handledecress}>-</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col col-12 col-lg-4 col-md-12 col-sm-12">
              <div className="cart-order-summary">
                <h5>Order Summary </h5>
                <div className="order-summar-com">
                  <p>Subtotal (2 items)</p>
                  <span className="cart-tk">TK: 645</span>
                </div>
                <div className="order-summar-com">
                  <p>Shipping Fee</p>
                  <span className="cart-tk">TK:60</span>
                </div>
                <div className="order-summar-com">
                  <p>Shipping Fee Discount</p>
                  <span className="cart-tk">Tk:60</span>
                </div>
                <div className="order-summar-com">
                  <input
                    className="voucher-input"
                    placeholder="Enter Voucher Code"
                  />
                  <button className="code-btn">Apply code</button>
                </div>
                <div className="order-summar-com">
                  <p>Total</p>
                  <p>TK: 200</p>
                </div>
                <div className="cart-checkout-con">
                  <button className="cart-checkout-btn">
                    {" "}
                    PROCEED TO CHECKOUT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* <div className="cartproduct-row-col">
        <div className="row">
          <div className="col col-12 col-lg-8 col-md-12 col-sm-12 cartproduct-left">
            <div className="cart-all-select">
              <div className="all-select-button-con">
                <button></button>
                <p>Select All ({cartproducts?.length} items)</p>
              </div>
              <RiDeleteBin5Line className="cart-delete-icon"></RiDeleteBin5Line>
            </div>
            <div className="cart-product-con">
              {cartproducts?.map((product) => (
                <div className="cart-product">
                  <button className="select-a-cart-btn"></button>
                  <img
                    className="cart-image"
                    src={product?.Product_image}
                    alt="not"
                  />
                  <div className="cart-product-info">
                    <h6>{product?.product_name}</h6>
                    <p>{product?.brand}</p>
                  </div>
                  <div>
                    <h5>Tk: {product?.product_price}</h5>
                    <div className="favarite-delete">
                      <MdFavoriteBorder className="cart-delete1"></MdFavoriteBorder>
                      <RiDeleteBin5Line className="cart-delete"></RiDeleteBin5Line>
                    </div>
                  </div>
                  <div className="number-input">
                    <button onClick={handleincress}>+</button>
                    <span>1</span>
                    <button onClick={handledecress}>-</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col col-12 col-lg-4 col-md-12 col-sm-12">
            <div className="cart-order-summary">
              <h5>Order Summary </h5>
              <div className="order-summar-com">
                <p>Subtotal (2 items)</p>
                <span className="cart-tk">TK: 645</span>
              </div>
              <div className="order-summar-com">
                <p>Shipping Fee</p>
                <span className="cart-tk">TK:60</span>
              </div>
              <div className="order-summar-com">
                <p>Shipping Fee Discount</p>
                <span className="cart-tk">Tk:60</span>
              </div>
              <div className="order-summar-com">
                <input
                  className="voucher-input"
                  placeholder="Enter Voucher Code"
                />
                <button className="code-btn">Apply code</button>
              </div>
              <div className="order-summar-com">
                <p>Total</p>
                <p>TK: 200</p>
              </div>
              <div className="cart-checkout-con">
                <button className="cart-checkout-btn">
                  {" "}
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default CartProductsPages;
