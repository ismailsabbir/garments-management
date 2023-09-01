import React from "react";
import { Link } from "react-router-dom";
import "./AboutBanner.css";
const AboutBanner = () => {
  return (
    <div className="about-banner-con">
      <div className="ml-28 about-banner-text">
        <h1>About Garmen</h1>
        <div className="banner-link">
          <Link className="first-link">Home</Link>
          <p>/</p>
          <Link className="secound-link">About us</Link>
        </div>
      </div>
    </div>
  );
};

export default AboutBanner;
