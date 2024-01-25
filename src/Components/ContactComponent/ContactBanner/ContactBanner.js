import React from "react";
import { Link } from "react-router-dom";

const ContactBanner = () => {
  console.log("Contact Banner");
  return (
    <div className="about-banner-con">
      <div className="ml-28 about-banner-text">
        <h1>Contact Us</h1>
        <div className="banner-link">
          <Link className="first-link">Home</Link>
          <p>/</p>
          <Link className="secound-link">Contact Us</Link>
        </div>
      </div>
    </div>
  );
};

export default ContactBanner;
