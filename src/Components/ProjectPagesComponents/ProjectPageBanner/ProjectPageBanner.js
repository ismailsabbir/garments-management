import React from "react";
import { Link } from "react-router-dom";

const ProjectPageBanner = () => {
  console.log("Project page banner");
  return (
    <div className="about-banner-con">
      <div className="ml-28 about-banner-text">
        <h1>Our Project</h1>
        <div className="banner-link">
          <Link className="first-link">Home</Link>
          <p>/</p>
          <Link className="secound-link">Projects</Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectPageBanner;
