import React from "react";
import ServicesDetailsBanner from "../../Components/ServicesDetailsComponents/ServicesDetailsBanner/ServicesDetailsBanner";
import { useLoaderData } from "react-router-dom";
import ServicesDetailsLeft from "../../Components/ServicesDetailsComponents/ServicesDetailsLeft/ServicesDetailsLeft";
import ServicesDetailsRight from "../../Components/ServicesDetailsComponents/ServicesDetailsRight/ServicesDetailsRight";
import "./ServicesDetails.css";
const ServicesDetails = () => {
  const service = useLoaderData();
  console.log("Service Details");
  return (
    <div className="mb-28">
      <ServicesDetailsBanner></ServicesDetailsBanner>
      <div className="services-details-con">
        <div className="row">
          <div className="service-details-left col col-12 col-lg-9 col-md-12 col-sm-12">
            <ServicesDetailsLeft service={service}></ServicesDetailsLeft>
          </div>
          <div className="service-details-right col col-12 col-lg-3 col-md-12 col-sm-12">
            <ServicesDetailsRight></ServicesDetailsRight>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesDetails;
