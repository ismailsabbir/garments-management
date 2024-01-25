import React, { useContext } from "react";
import "./ServicesList.css";
import { servcontext } from "../../../App";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
const ServicesList = () => {
  const { data } = useContext(servcontext);
  console.log("Service List");
  return (
    <div className="services-list-con bg-neutral">
      <h4>Other Services</h4>
      {data?.map((service) => (
        <div className="services-process">
          <FaArrowRightLong
            className="right-arrow"
            id="right"
          ></FaArrowRightLong>
          <Link to={`/serviceDetails/${service?._id}`} className="serv-name">
            {service?.name}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ServicesList;
