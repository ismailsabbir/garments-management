import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import bkash from "../../../Images/bkash.png";
import card from "../../../Images/cred.png";
import nogod from "../../../Images/nogod.avif";
import cash from "../../../Images/cashon.png";
import rocket from "../../../Images/rocket.png";
import visa from "../../../Images/visa.png";
import circle from "../../../Images/circel.png";
import blue from "../../../Images/bluecrd.png";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ShopCheckoutForm from "../ShopCheckoutForm/ShopCheckoutForm";
import { useEffect } from "react";
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
const ShopPaymentPages = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  // const [confirm_info, setConfirmInfo] = useState();

  // useEffect(() => {
  //   if (state && state.orderconfirm) {
  //     setConfirmInfo(state.orderconfirm);
  //   } else {
  //     navigate("/shop");
  //   }
  // }, [state, navigate]);
  // const confirm_info = state.orderconfirm;
  const confirm_info = state.orderconfirm;
  console.log(confirm_info);
  const [cardshow, setcardshow] = useState(true);
  const [bkashshow, setbkashshow] = useState(false);
  const cardhandler = () => {
    setbkashshow(false);
    setcardshow(true);
  };
  const handlebkashshow = () => {
    setcardshow(false);
    setbkashshow(true);
  };
  const handlebkashpayment = () => {
    fetch(`${process.env.REACT_APP_URL}/product_bkash_payment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(confirm_info),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        window.location.replace(data.url);
      });
  };
  return (
    <div className="paymentcontainer">
      <div className="payment-text">
        <div className="row payment-types-pt ">
          <div className="col col-12 col-sm-12 col-md-12 col-lg-8">
            <h5>Select Payment Method</h5>
            <div className="payment-typess">
              <div className="bkash" onClick={cardhandler}>
                <img src={card} alt="not found" />
                <p>Credit/Debit Card</p>
              </div>
              {/* <div className="bkash">
                <img src={nogod} alt="not found" />
                <p>Nagad</p>
              </div>
              <div className="bkash">
                <img src={rocket} alt="not found" />
                <p>Rocket</p>
              </div> */}
              <div
                className="bkash"
                id="bkash-nagod-rocket"
                onClick={handlebkashshow}
              >
                <div className="pay-bk">
                  <img src={rocket} alt="not found" />
                  <p>Rocket</p>
                </div>
                <div className="pay-bk">
                  <img src={bkash} alt="not found" />
                  <p>Save bKash Account</p>
                </div>
                <div className="pay-bk">
                  <img src={nogod} alt="not found" />
                  <p>Nagad</p>
                </div>
              </div>
              {/* <div className="bkash" onClick={handlebkashshow}>
                <img src={bkash} alt="not found" />
                <p>Save bKash Account</p>
              </div> */}
              <div className="bkash">
                <img src={cash} alt="not found" />
                <p>Cash On Delivery</p>
              </div>
            </div>
            <div className={cardshow ? "show" : "notshow"}>
              <div className="card-info-con">
                <div className="cardss">
                  <img src={visa} alt="not found" />
                  <img src={circle} alt="not found" />
                  <img src={blue} alt="not found" />
                </div>
                {/* //////////////////////////////////////////////// */}
                <div>
                  <Elements stripe={stripePromise}>
                    <ShopCheckoutForm
                      paymentinfo={confirm_info}
                    ></ShopCheckoutForm>
                  </Elements>
                </div>
              </div>
            </div>
            <div className={bkashshow ? "show" : "notshow"}>
              <div className="card-info-con">
                <div className="">
                  <p>
                    1) Users paying with bkash for the first time: Enter bKash
                    Wallet Number and OTP for successful account saving.
                  </p>
                  <p>2) For all subsequent users: Enter PIN to make payment</p>
                  <button onClick={handlebkashpayment} className="pay-now-btn">
                    Pay Now
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col col-12 col-sm-12 col-md-12 col-lg-4">
            <div className="taka-payment-con">
              <h5>Order Summary</h5>
              <div className="taka-payment">
                <p>
                  Subtotal ({confirm_info?.pices} Items and shipping fee
                  included)
                </p>
                <p>${confirm_info?.price}</p>
              </div>
              <div className="taka-payment">
                <p>Total Amount</p>
                <p className="totla-taka">$ {confirm_info?.total_price}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPaymentPages;
