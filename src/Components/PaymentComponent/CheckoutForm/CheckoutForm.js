import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";

const CheckoutForm = ({ paymentinfo }) => {
  const [carterror, setcarderror] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [paymentsucess, setpaymentsucess] = useState("");
  const [transactionid, settransactionid] = useState("");
  const [paymentstatus, setpaymentstatus] = useState(false);
  const [payprocessing, setpayprocessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { email, total_price } = paymentinfo;

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(paymentinfo),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [paymentinfo]);
  console.log(clientSecret);
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("sub");
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
      alert("sucess");
      //   toast("Payment Completed!", {
      //     position: "top-center",
      //     autoClose: 50,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: "light",
      //   });
      // setpaymentstatus(true);
      // setpayprocessing(false);
      // const paymentinfo = {
      //   firstname,
      //   lastname,
      //   email,
      //   mobile,
      //   country,
      //   city,
      //   postcode,
      //   productinfo,
      //   totaldoler,
      //   transactionId: paymentIntent.id,
      // };
      // Using Fetch API
      // fetch(`${process.env.REACT_APP_HOST_LINK}/payments`, {
      //   method: "POST",
      //   body: JSON.stringify(paymentinfo),
      //   headers: {
      //     "Content-type": "application/json",
      //   },
      // })
      //   .then((response) => response.json())
      //   .then((data) => {
      //     if (data.insertedId) {
      //       setpaymentstatus(true);
      //       setpayprocessing(false);
      //     }
      //   })
      //   .catch((err) => {
      //     console.log(err.message);
      //   });
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
      <p className="payment-sucess">{paymentsucess}</p>
      {paymentstatus ? (
        <p className="transaction-id">
          <span className="transactionspan">Transaction:</span>
          {transactionid}
        </p>
      ) : (
        <></>
      )}

      {/* <ToastContainer></ToastContainer> */}
    </form>
  );
};

export default CheckoutForm;
