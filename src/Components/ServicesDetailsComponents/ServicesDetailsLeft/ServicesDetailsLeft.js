import React from "react";
import "./ServicesDetailsLeft.css";
import { AiOutlineFileText, AiOutlineFolderOpen } from "react-icons/ai";
import { PiShareFat } from "react-icons/pi";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
const ServicesDetailsLeft = ({ service }) => {
  console.log("Service Details Left");
  return (
    <div className="service-details-left-con">
      <div className="service-details-image">
        <img src={service?.image} alt="not found" />
      </div>
      <h1>About {service?.name}</h1>
      <div className="service-share-con">
        <div className="share">
          <AiOutlineFolderOpen className="share-icon"></AiOutlineFolderOpen>
          <Link className="share-link" to="services">
            Services
          </Link>
        </div>
        <p className="ml-4 mr-4">|</p>
        <div className="share">
          <AiOutlineFileText className="share-icon"></AiOutlineFileText>
          <Link className="share-link">Service Details</Link>
        </div>
        <p className="ml-4 mr-4">|</p>
        <div className="share">
          <PiShareFat className="share-icon"></PiShareFat>
          <Link className="share-link">Share</Link>
        </div>
      </div>
      <p className="service-about-text">{service?.about}</p>
      <div className="service-details-mid">
        <div className="details-mid-image">
          <img src={service?.image1} alt="not found" />
        </div>
        <div className="details-mid-right">
          <h5>Basic {service?.name} You Should Know</h5>
          {service?.types.map((type) => (
            <div className="services-types">
              <FaArrowRightLong className="right-arrow"></FaArrowRightLong>
              <p>{type}</p>
            </div>
          ))}
        </div>
      </div>
      <p className="service-abou">{service?.about}</p>
      <h4 className="servicess-proc-hed">Our Excellence in {service?.name}</h4>
      {service?.process.map((proc) => (
        <div className="services-process">
          <FaArrowRightLong className="right-arrow"></FaArrowRightLong>
          <p>
            <span>{proc?.name}:</span>
            {proc?.process}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ServicesDetailsLeft;
