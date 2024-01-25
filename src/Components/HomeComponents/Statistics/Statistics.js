import React, { useEffect, useState } from "react";
import "./Statistics.css";
import { FaPlus } from "react-icons/fa";
const Statistics = () => {
  const [completedProjects, setCompletedProjects] = useState(0);
  const [exportCountries, setExportCountries] = useState(0);
  const [satisfiedCustomers, setSatisfiedCustomers] = useState(0);
  const [MAX_COMPLETED_PROJECTS, setMAX_COMPLETED_PROJECTS] = useState(500);
  const [MAX_EXPORT_COUNTRIES, setMAX_EXPORT_COUNTRIES] = useState(100);
  const [MAX_SATISFIED_CUSTOMERS, setMAX_SATISFIED_CUSTOMERS] = useState(500);
  console.log("Statistic");
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCompletedProjects((prevCount) =>
        prevCount < MAX_COMPLETED_PROJECTS ? prevCount + 1 : prevCount
      );
      setExportCountries((prevCount) =>
        prevCount < MAX_EXPORT_COUNTRIES ? prevCount + 1 : prevCount
      );
      setSatisfiedCustomers((prevCount) =>
        prevCount < MAX_SATISFIED_CUSTOMERS ? prevCount + 1 : prevCount
      );
    }, 10);
    return () => clearInterval(intervalId);
  }, []);
  return (
    <div className="statistics-con">
      <h1>
        Our Industry <br /> In Number
      </h1>
      <div className="statistics-1">
        <div className="number-plus">
          <h1>{completedProjects}</h1>
          <FaPlus className="plus-icon"></FaPlus>
        </div>
        <h4>Completed Project</h4>
      </div>
      <div className="statistics-1">
        <div className="number-plus">
          <h1>{exportCountries}</h1>
          <FaPlus className="plus-icon"></FaPlus>
        </div>
        <h4>Export Country</h4>
      </div>
      <div className="statistics-1">
        <div className="number-plus">
          <h1>{satisfiedCustomers}</h1>
          <FaPlus className="plus-icon"></FaPlus>
        </div>
        <h4>Satisfied Customer</h4>
      </div>
    </div>
  );
};

export default Statistics;
