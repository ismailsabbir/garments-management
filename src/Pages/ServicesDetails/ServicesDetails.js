import React from "react";
import ServicesDetailsBanner from "../../Components/ServicesDetailsComponents/ServicesDetailsBanner/ServicesDetailsBanner";
import { useLoaderData } from "react-router-dom";
import ServicesDetailsLeft from "../../Components/ServicesDetailsComponents/ServicesDetailsLeft/ServicesDetailsLeft";
import ServicesDetailsRight from "../../Components/ServicesDetailsComponents/ServicesDetailsRight/ServicesDetailsRight";
import "./ServicesDetails.css";
const ServicesDetails = () => {
  const service = useLoaderData();
  return (
    <div className="mb-28">
      <ServicesDetailsBanner></ServicesDetailsBanner>
      <div className="services-details-con row">
        <div className="service-details-left col col-12 col-lg-8 col-md-12 col-sm-12">
          <ServicesDetailsLeft service={service}></ServicesDetailsLeft>
        </div>
        <div className="service-details-right col col-12 col-lg-4 col-md-12 col-sm-12">
          <ServicesDetailsRight></ServicesDetailsRight>
        </div>
      </div>
    </div>
  );
};

export default ServicesDetails;
