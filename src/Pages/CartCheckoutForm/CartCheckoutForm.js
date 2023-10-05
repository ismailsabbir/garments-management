import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const CartCheckoutForm = ({ paymentinfo }) => {
  const navigate = useNavigate();
  const [carterror, setcarderror] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [paymentsucess, setpaymentsucess] = useState("");
  const [transactionid, settransactionid] = useState("");
  const [paymentstatus, setpaymentstatus] = useState(false);
  const [payprocessing, setpayprocessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  // const [paymentinfos, setpaymentinfos] = useState();

  // useEffect(() => {
  //   if (paymentinfo) {
  //     setpaymentinfos(paymentinfo);
  //     console.log(" payments");
  //   } else {
  //     navigate("/shop");
  //     console.log("not payments");
  //   }
  // }, [paymentinfo, navigate]);
  console.log(paymentinfo);
  const { email, orderid } = paymentinfo;
  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(paymentinfo),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [paymentinfo]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log(error);
      setcarderror(error);
    } else {
      setcarderror("");
      console.log(paymentMethod);
    }
    setpaymentsucess("");
    settransactionid("");
    setpaymentstatus(false);
    setpayprocessing(true);
    const { paymentIntent, error: confirmerror } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: "",
            email: email,
          },
        },
      });
    if (confirmerror) {
      setcarderror(confirmerror.message);
      return;
    }
    console.log(paymentIntent);
    if (paymentIntent.status === "succeeded") {
      setpaymentsucess("congratulations! Payment Completed");
      settransactionid(paymentIntent.id);
      navigate(`/cart_payment_sucess?transiction_id=${paymentIntent.id}`);

      toast("Payment Completed!", {
        position: "top-center",
        autoClose: 80,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      const transiction_id = paymentIntent.id;
      const orderinfo = {
        ...paymentinfo,
        transiction_id,
      };
      fetch(`${process.env.REACT_APP_URL}/cartpayment/${orderid}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(orderinfo),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.insertedId) {
            setpaymentstatus(true);
            setpayprocessing(false);
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className="pay-now-btn mt-8"
        id="paydoller"
        type="submit"
        disabled={!stripe || !clientSecret || paymentstatus || payprocessing}
      >
        Pay
      </button>
      <p className="payment-sucess alert alert-success mt-6">{paymentsucess}</p>

      {paymentstatus ? (
        <p className="transaction-id">
          <span className="transactionspan">Transaction:</span>
          {transactionid}
        </p>
      ) : (
        <></>
      )}

      <ToastContainer></ToastContainer>
    </form>
  );
};

export default CartCheckoutForm;
