import React from "react";
import { Link } from "react-router-dom";

const ShopBanner = () => {
  return (
    <div className="about-banner-con">
      <div className="ml-28 about-banner-text">
        <h1>Our Shop </h1>
        <div className="banner-link">
          <Link to="/" className="first-link">
            Home
          </Link>
          <p>/</p>
          <Link className="secound-link"> Shop</Link>
        </div>
      </div>
    </div>
  );
};

export default ShopBanner;
