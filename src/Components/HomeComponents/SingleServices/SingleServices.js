import React from "react";
import { Link } from "react-router-dom";
import { MdArrowRightAlt } from "react-icons/md";
import "./SingleServices.css";
const SingleServices = ({ service }) => {
  return (
    <Link className="service-info col col-12 col-sm-12 col-md-4 col-lg-3">
      <img src={service.picture} alt="not" />
      <h3>{service.name}</h3>
      <p>{service.about.slice(0, 70)}</p>
      <Link className="read-more-btn">
        Read More
        <MdArrowRightAlt className="right-arrow-sign"></MdArrowRightAlt>{" "}
      </Link>
    </Link>
  );
};

export default SingleServices;
