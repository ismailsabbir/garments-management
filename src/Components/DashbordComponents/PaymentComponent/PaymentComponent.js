import React, { useEffect, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { ToastContainer, toast } from "react-toastify";
const PaymentComponent = ({ employeeId, amount }) => {
  console.log("Payment Component");
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentstatus, setpaymentstatus] = useState(false);
  const [payprocessing, setpayprocessing] = useState(false);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/employee-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(employeeId),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [employeeId]);
  const handlePayment = async (e) => {
    e.preventDefault();
    setpayprocessing(true);
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (error) {
      setPaymentError(error.message);
      setpayprocessing(false);
      return;
    }
    const response = await fetch(`${process.env.REACT_APP_URL}/make-payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amount * 100,
        employeeId: employeeId?.employee_id,
        email: employeeId?.email,
        employeeinfo: employeeId,
      }),
    });
    const data = await response.json();
    setClientSecret(data?.clientSecret);
    if (response.ok) {
      setPaymentError(null);
      setPaymentSuccess(true);

      const { paymentIntent, error: confirmerror } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              name: employeeId?.name,
              email: employeeId?.email,
            },
          },
        });
      if (confirmerror) {
        return;
      }
      if (paymentIntent) {
        setpaymentstatus(true);
        setpayprocessing(false);
        toast("Salary add sucessfully!", {
          position: "top-center",
          autoClose: 800,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } else {
      setPaymentError(data.error || "Payment failed");
      setpayprocessing(false);
      setPaymentSuccess(false);
    }
  };

  return (
    <form onSubmit={handlePayment}>
      <p>Card Number: {employeeId?.cardId}</p>
      <CardElement />
      {paymentError && <div style={{ color: "red" }}>{paymentError}</div>}
      <button
        className="pay-now-btn mt-8"
        id="paydoller"
        type="submit"
        disabled={payprocessing}
      >
        {payprocessing ? <>Processing.....</> : <>Pay</>}
      </button>
      <ToastContainer></ToastContainer>
    </form>
  );
};

export default PaymentComponent;
