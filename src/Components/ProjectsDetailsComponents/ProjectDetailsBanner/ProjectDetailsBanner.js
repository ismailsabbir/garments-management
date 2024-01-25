import React from "react";
import { Link } from "react-router-dom";

const ProjectDetailsBanner = () => {
  console.log("project details banner");
  return (
    <div className="about-banner-con">
      <div className="ml-28 about-banner-text">
        <h1>Project Detail</h1>
        <div className="banner-link">
          <Link className="first-link">Home</Link>
          <p>/</p>
          <Link className="secound-link"> Project</Link>
          <p>/</p>
          <Link className="secound-link"> Project Details</Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsBanner;
