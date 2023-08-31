import React from "react";
import "./Statistics.css";
import { FaPlus } from "react-icons/fa";
const Statistics = () => {
  return (
    <div className="statistics-con">
      <h1>
        Our Industry <br /> In Number
      </h1>
      <div className="statistics-1">
        <div className="number-plus">
          <h1>5,000</h1>
          <FaPlus className="plus-icon"></FaPlus>
        </div>

        <h4>Completed Project</h4>
      </div>
      <div className="statistics-1">
        <div className="number-plus">
          <h1>120</h1>
          <FaPlus className="plus-icon"></FaPlus>
        </div>
        <h4>Export Country</h4>
      </div>
      <div className="statistics-1">
        <div className="number-plus">
          <h1>7,500</h1>
          <FaPlus className="plus-icon"></FaPlus>
        </div>
        <h4>Satisfied Customer</h4>
      </div>
    </div>
  );
};

export default Statistics;
