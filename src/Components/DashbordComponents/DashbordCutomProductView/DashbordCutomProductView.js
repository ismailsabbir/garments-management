import React from "react";
import "./DashbordCutomProductView.css";
import { Link, useLocation } from "react-router-dom";
const DashbordCutomProductView = () => {
  const location = useLocation();
  const product = location.state;
  console.log(product);
  return (
    <div className="product-view-con">
      <h5 className="mb-4 product-view-hed">Product Details</h5>
      <div className="product-view-details">
        <div className="product-view-details-left">
          <img src={product?.image} alt="not" />
        </div>
        <div className="product-view-details-right">
          <h6>{product?.name}</h6>
          <p>Category: {product?.name}</p>
          <p>QUANTITY:{product?.availavle}</p>
          <p>Default Price: {product?.default_price}</p>
          <p>Custom Price: {product?.custom_price}</p>
          <Link
            to="/dashbord/custom-product-edit"
            state={product}
            className="product-edit-btn"
          >
            Edit Product
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashbordCutomProductView;
