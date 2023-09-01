import React from "react";
import { Link } from "react-router-dom";

const ServicesDetailsBanner = () => {
  return (
    <div className="about-banner-con">
      <div className="ml-28 about-banner-text">
        <h1>Service Detail</h1>
        <div className="banner-link">
          <Link to="/" className="first-link">
            Home
          </Link>
          <p>/</p>
          <Link to="/services" className="secound-link">
            Service
          </Link>
          <p>/</p>
          <Link to="/service Details" className="secound-link">
            Service Detail
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServicesDetailsBanner;
