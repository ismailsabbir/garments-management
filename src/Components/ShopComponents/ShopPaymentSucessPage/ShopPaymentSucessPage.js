import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { GoInfo } from "react-icons/go";
import { useLocation } from "react-router-dom";

const ShopPaymentSucessPage = () => {
  const [products, setproducts] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const transiction_id = query.get("transiction_id");
  console.log("Shop Payment Sucess Page");
  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_URL}/shoporder/by_transcation_id/${transiction_id}`
    )
      .then((res) => res.json())
      .then((data) => setproducts(data))
      .catch((error) => {});
  }, [transiction_id]);
  return (
    <div className="payment-sucess-con">
      <div className="paymentinfo">
        <p className="order-sum-title">
          <GoInfo></GoInfo> Your Order Summary
        </p>
        <div className="alert alert-success">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{products?.name} your Payment is Sucessfull !!!!</span>
        </div>

        <div>
          <div className="products-images">
            <div className="main-product">
              <img src={products?.dress_photo} alt="n" />
            </div>

            <div className="product-design">
              <div className="front-con">
                <h6>Full Design</h6>
                <img className="front" src={products?.dress_photo} alt="not" />
              </div>
              <div className="back-con">
                <h6>Back Design</h6>
                <img className="back" src={products?.backphoto} alt="not" />
              </div>
            </div>
          </div>

          <h5 className="payment-title">Product Information :</h5>
          <div className="payment-customer-info">
            <div>
              <h5>Product Name</h5>
              <h6>{products?.category_name}</h6>
            </div>
            <div>
              <h5>Product Quality</h5>
              <h6>{products?.qualityname}</h6>
            </div>
            <div>
              <h5>Quentity</h5>
              <h6>{products?.pices}</h6>
            </div>
            <div>
              <h5>Total Amount</h5>
              <h6>{products?.total_price}</h6>
            </div>
          </div>
          <h5 className="payment-title">Payment Information:</h5>
          <div className="payment-customer-info">
            <div>
              <h5>Order Id</h5>
              <h6>{products?.orderid}</h6>
            </div>
            <div>
              <h5>Order Status</h5>
              <h6>{products?.order_status}</h6>
            </div>
            <div>
              <h5>Payment Status</h5>
              <h6>{products?.order}</h6>
            </div>
            <div>
              <h5>Transiction Id</h5>
              <h6>{products?.transiction_id}</h6>
            </div>
          </div>
          <h5 className="payment-title">Your Contact Information:</h5>
          <div className="payment-customer-info">
            <div>
              <h5>Name</h5>
              <h6>{products?.name}</h6>
            </div>
            <div>
              <h5>Email</h5>
              <h6>{products?.email}</h6>
            </div>
            <div>
              <h5>Mobile Number</h5>
              <h6>{products?.phone}</h6>
            </div>
            <div>
              <h5>Address</h5>
              <h6>{products?.address}</h6>
            </div>
          </div>
        </div>
        <div className="pay-sucess-button print:hidden">
          <button onClick={() => window.print()}>
            PRINT PAYMENT INFORMATION
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopPaymentSucessPage;
