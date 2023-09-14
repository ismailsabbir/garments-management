import React from "react";
import { Link } from "react-router-dom";

const CustomizeDetailsBanner = () => {
  return (
    <div className="about-banner-con">
      <div className="ml-28 about-banner-text">
        <h1>Customized Dress</h1>
        <div className="banner-link">
          <Link className="first-link">Home</Link>
          <p>/</p>
          <Link className="secound-link">Customize</Link>
        </div>
      </div>
    </div>
  );
};

export default CustomizeDetailsBanner;
