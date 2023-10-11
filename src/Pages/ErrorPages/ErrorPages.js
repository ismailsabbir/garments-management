import React from "react";
import "./ErrorPages.css";
import image from "../../Images/error.svg";
import { Link } from "react-router-dom";
const ErrorPages = () => {
  return (
    <div className="Error-page-con">
      <div className="error-message-con">
        <img src={image} alt="" />
        <h1>Page is not found</h1>
        <Link to="/" className="back-home-btn">
          Back To Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPages;
