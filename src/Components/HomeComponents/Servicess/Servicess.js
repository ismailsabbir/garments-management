import React, { useContext } from "react";
import "./Servicess.css";
import { servcontext } from "../../../App";
import SingleServices from "../SingleServices/SingleServices";
const Servicess = () => {
  const { data } = useContext(servcontext);
  console.log("Service");
  return (
    <div className="homeservices-con">
      <div className="homeservices-top">
        <h5>OUR SERVICE</h5>
        <h1>Textile is What We Do</h1>
        <p>
          Engaged in textile-related activities involving fibers, fabrics, and
          materials for clothing, furnishings, and more. Feel free to ask about
          any textile-related topics you're interested in!!!
        </p>
      </div>
      <div className="home-servicess row">
        {data?.map((service) => (
          <SingleServices service={service} key={service?._id}></SingleServices>
        ))}
      </div>
    </div>
  );
};

export default Servicess;
