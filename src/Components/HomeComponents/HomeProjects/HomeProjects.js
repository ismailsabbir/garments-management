import React, { useContext } from "react";
import { servcontext } from "../../../App";
import "./HomeProjects.css";
import SingleProject from "../SingleProject/SingleProject";
const HomeProjects = () => {
  const { projects } = useContext(servcontext);
  return (
    <div className="homeprojects-con">
      <div className="homeservices-top" id="home-project-top">
        <h5>OUR PROJECT</h5>
        <h1>Some of Our Project</h1>
        <p>
          Engaged in textile-related activities involving fibers, fabrics, and
          materials for clothing, furnishings, and more. Feel free to ask about
          any textile-related topics you're interested in!!!
        </p>
      </div>
      <div className="home-servicess row">
        {projects?.map((project) => (
          <SingleProject project={project} key={project?._id}></SingleProject>
        ))}
      </div>
    </div>
  );
};

export default HomeProjects;
