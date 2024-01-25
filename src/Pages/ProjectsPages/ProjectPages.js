import React from "react";
import ProjectPageBanner from "../../Components/ProjectPagesComponents/ProjectPageBanner/ProjectPageBanner";
import HomeProjects from "../../Components/HomeComponents/HomeProjects/HomeProjects";
import HomeContact from "../../Components/HomeComponents/HomeContact/HomeContact";

const ProjectPages = () => {
  console.log("Project Page");
  return (
    <div>
      <ProjectPageBanner></ProjectPageBanner>
      <HomeProjects></HomeProjects>
      <HomeContact></HomeContact>
    </div>
  );
};

export default ProjectPages;
