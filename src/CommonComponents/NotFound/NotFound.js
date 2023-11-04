import React from "react";
import image from "../../Images/notfound.svg";
import "./NotFound.css";
const NotFound = () => {
  return (
    <div className="not-found-con">
      <img src={image} alt="not" />
      <h3>Sorry, we can not find this Product😞</h3>
    </div>
  );
};

export default NotFound;
