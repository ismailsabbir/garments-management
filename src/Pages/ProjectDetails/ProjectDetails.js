import React from "react";
import { useLoaderData } from "react-router-dom";
import ProjectDetailsBanner from "../../Components/ProjectsDetailsComponents/ProjectDetailsBanner/ProjectDetailsBanner";
import ServicesDetailsRight from "../../Components/ServicesDetailsComponents/ServicesDetailsRight/ServicesDetailsRight";
import ProjectDetailsLeft from "../../Components/ProjectsDetailsComponents/ProjectDetailsLeft/ProjectDetailsLeft";

const ProjectDetails = () => {
  const project = useLoaderData();
  console.log("Project Details");
  return (
    <div className="mb-28">
      <ProjectDetailsBanner></ProjectDetailsBanner>
      <div className="services-details-con">
        <div className="row">
          <div className="service-details-left col col-12 col-lg-9 col-md-12 col-sm-12">
            <ProjectDetailsLeft project={project}></ProjectDetailsLeft>
          </div>
          <div className="service-details-right col col-12 col-lg-3 col-md-12 col-sm-12">
            <ServicesDetailsRight></ServicesDetailsRight>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
