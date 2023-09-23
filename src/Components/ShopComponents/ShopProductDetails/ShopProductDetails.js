import React, { useContext } from "react";
import "./ShopProductDetails.css";
import { servcontext } from "../../../App";
import { useLocation } from "react-router-dom";
const ShopProductDetails = () => {
  const { shopproduct } = useContext(servcontext);
  const location = useLocation();
  const { pathname } = location;
  const categoryid = pathname.split("/")[2];
  const id = pathname.split("/")[3];
  const singleproducts = shopproduct?.filter(
    (products) => products.category_id === categoryid
  );
  const singlproduct = singleproducts?.[0]?.products;
  const productss = singlproduct?.filter(
    (products) => products.product_id === id
  );
  const oneproduct = productss?.[0];
  console.log(oneproduct);
  return (
    <div className="shop-details-container">
      <div className="shop-details-left-right">
        <div className="shop-details-left"></div>
        <div className="shop-details-right"></div>
      </div>
      <h1>details</h1>
    </div>
  );
};

export default ShopProductDetails;
