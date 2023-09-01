import React from "react";
import { AiOutlineFileText, AiOutlineFolderOpen } from "react-icons/ai";
import { FaArrowRightLong } from "react-icons/fa6";
import { PiShareFat } from "react-icons/pi";
import { Link } from "react-router-dom";
import "./ProjectDetailsLeft.css";
const ProjectDetailsLeft = ({ project }) => {
  console.log(project);
  return (
    <div className="service-details-left-con">
      <div className="service-details-image">
        <img src={project?.image} alt="not found" />
      </div>
      <h1>About {project?.name}</h1>
      <div className="service-share-con">
        <div className="share">
          <AiOutlineFolderOpen className="share-icon"></AiOutlineFolderOpen>
          <Link className="share-link" to="services">
            Projects
          </Link>
        </div>
        <p className="ml-4 mr-4">|</p>
        <div className="share">
          <AiOutlineFileText className="share-icon"></AiOutlineFileText>
          <Link className="share-link">Projects Details</Link>
        </div>
        <p className="ml-4 mr-4">|</p>
        <div className="share">
          <PiShareFat className="share-icon"></PiShareFat>
          <Link className="share-link">Share</Link>
        </div>
      </div>
      <p className="service-about-text">{project?.about}</p>
      <div className="service-details-mid">
        <div className="details-mid-image">
          <img src={project?.picture1} alt="not found" />
        </div>
        <div className="details-mid-right" id="project-mid-right">
          <img src={project?.picture2} alt="not found" />
        </div>
      </div>
      <p className="service-abou">{project?.about}</p>
      <h4 className="servicess-proc-hed">How is {project?.name} Made?</h4>
      {project?.process.map((proc) => (
        <div className="services-process">
          <FaArrowRightLong className="right-arrow"></FaArrowRightLong>
          <p>
            <span>{proc?.name}:</span>
            {proc?.process}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ProjectDetailsLeft;
