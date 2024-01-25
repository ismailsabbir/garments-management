import React from "react";
import "./ServicesBanner.css";
import { Link } from "react-router-dom";
const ServicesBanner = () => {
  console.log("service Banner");
  return (
    <div className="about-banner-con">
      <div className="ml-28 about-banner-text">
        <h1>Our Services</h1>
        <div className="banner-link">
          <Link className="first-link">Home</Link>
          <p>/</p>
          <Link className="secound-link">Services</Link>
        </div>
      </div>
    </div>
  );
};

export default ServicesBanner;
