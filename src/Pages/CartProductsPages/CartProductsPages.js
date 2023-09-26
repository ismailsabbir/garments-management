import React from "react";
import "./CartProductsPages.css";
import { useContext } from "react";
import { AuthContext } from "../../Context/UserContext";
import { useEffect } from "react";
import { useState } from "react";

const CartProductsPages = () => {
  const { user } = useContext(AuthContext);
  const [cartproducts, setcartproducts] = useState([]);
  console.log(user);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/cartproduct?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => setcartproducts(data));
  }, [user?.email]);
  console.log(cartproducts);
  return (
    <div>
      {cartproducts?.map((product) => (
        <div>
          <img src={product?.Product_image} alt="not" />
        </div>
      ))}
    </div>
  );
};

export default CartProductsPages;
