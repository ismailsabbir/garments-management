import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import "./CartPaymentFailed.css";
const CartPaymentFailed = () => {
  const [products, setproducts] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const orderid = parseInt(query.get("orderid"));
  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/cart/order/by_order_id/${orderid}`)
      .then((req) => req.json())
      .then((data) => setproducts(data));
  }, [orderid]);
  console.log(products);
  const handlebkashpayment = () => {
    fetch(`${process.env.REACT_APP_URL}/cart_bkash_payment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(products),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        window.location.replace(data.url);
      });
  };
  return (
    <div className="payment-failed-con">
      <div className="payment-failed-info">
        <div className="alert alert-warning">
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
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Order Payment is not Completed !!!</span>
        </div>
        {products?.shopinfo?.map((products) => (
          <div className="failed-product mb-6">
            <img src={products?.Product_image} alt="not" />
            <h6>Product: {products?.product_name}</h6>
            <h6>Quentity: {products?.quentuty}</h6>
            <h6>Amount: {products?.product_price}</h6>
            <h6>
              Total Tk :{" "}
              {parseInt(products?.product_price) * parseInt(products?.quentuty)}
            </h6>
          </div>
        ))}
        <div className="cart-payment-failed-pay">
          <h5>Total Amount : {products?.total_price}</h5>
          <button onClick={handlebkashpayment} className="failed-pay">
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPaymentFailed;
