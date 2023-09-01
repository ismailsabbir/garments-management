import React from "react";
import "./ServicesDetailsLeft.css";
import { AiOutlineFileText, AiOutlineFolderOpen } from "react-icons/ai";
import { PiShareFat } from "react-icons/pi";

import { Link } from "react-router-dom";
const ServicesDetailsLeft = ({ service }) => {
  return (
    <div className="">
      <img src={service?.image} alt="not found" />
      <h1>About {service?.name}</h1>
      <div>
        <div>
          <AiOutlineFolderOpen></AiOutlineFolderOpen>
          <Link>Services</Link>
        </div>
        <div>
          <AiOutlineFileText></AiOutlineFileText>
          <Link>Service Details</Link>
        </div>
        <div>
          <PiShareFat></PiShareFat>
          <Link>Share</Link>
        </div>
      </div>
      <p>{service?.about}</p>
      <div>
        <div>
          <img src={service?.picture} alt="not found" />
        </div>
      </div>
    </div>
  );
};

export default ServicesDetailsLeft;
