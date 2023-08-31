import React from "react";
import "./SingleProject.css";
import { Link } from "react-router-dom";
import { MdArrowRightAlt } from "react-icons/md";
const SingleProject = ({ project }) => {
  return (
    <Link className="project-info col col-12 col-sm-12 col-md-4 col-lg-3">
      <img src={project.image} alt="not" />
      <div className="project-bottom-info bg-neutral">
        <h3>{project.name}</h3>
        <p>{project.about.slice(0, 60)}</p>
        <Link className="read-more-btn" id="projecct-read-more">
          Read More
          <MdArrowRightAlt className="right-arrow-sign"></MdArrowRightAlt>{" "}
        </Link>
      </div>
    </Link>
  );
};

export default SingleProject;
