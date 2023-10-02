import React from "react";
import "./PaymentSucessPage.css";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
const PaymentSucessPage = () => {
  const [products, setproducts] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const transiction_id = query.get("transiction_id");
  console.log(transiction_id);
  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_URL}/order/by_transcation_id/${transiction_id}`
    )
      .then((res) => res.json())
      .then((data) => setproducts(data));
  }, []);
  console.log(products);

  return (
    <div>
      <h1>Sucess</h1>
    </div>
  );
};

export default PaymentSucessPage;
