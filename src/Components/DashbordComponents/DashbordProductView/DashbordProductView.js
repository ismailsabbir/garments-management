import React from "react";
import "./DashbordProductView.css";
import { Link, useLocation } from "react-router-dom";
const DashbordProductView = () => {
  const location = useLocation();
  const product = location.state;
  console.log(product);
  return (
    <div className="product-view-con">
      <h5 className="mb-4 product-view-hed">Product Details</h5>
      <div className="product-view-details">
        <div className="product-view-details-left">
          <img src={product?.Product_image} alt="not" />
        </div>
        <div className="product-view-details-right">
          <h6>{product?.product_name}</h6>
          <p>Category: {product?.category_name}</p>
          <p>QUANTITY:{product?.availavle}</p>
          <p>Price: {product?.product_price}</p>
          <Link
            to="/dashbord/shop-product-edit"
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

export default DashbordProductView;
