import React from "react";
import image from "../../../Images/coming.svg";
import { Link } from "react-router-dom";
import "./DashbordCommingPage.css";
const DashbordCommingPage = () => {
  return (
    <div className="coming-soon-con">
      <img src={image} alt="" />
      <h2>Coming Soon!</h2>
      <Link className="back-btn">Back To Home</Link>
    </div>
  );
};

export default DashbordCommingPage;
