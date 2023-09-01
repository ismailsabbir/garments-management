import React from "react";
import "./HomePages.css";
import HomeBanner from "../../Components/HomeComponents/HomeBanner/HomeBanner";
import MissionVission from "../../Components/HomeComponents/MissionVission/MissionVission";
import Statistics from "../../Components/HomeComponents/Statistics/Statistics";
import Servicess from "../../Components/HomeComponents/Servicess/Servicess";
import Partnership from "../../Components/HomeComponents/Partnership/Partnership";
import HomeComments from "../../Components/HomeComponents/HomeComments/HomeComments";
import HomeContact from "../../Components/HomeComponents/HomeContact/HomeContact";
import HomeProjects from "../../Components/HomeComponents/HomeProjects/HomeProjects";
import HomeBlogs from "../../Components/HomeComponents/HomeBlogs/HomeBlogs";

const HomePages = () => {
  return (
    <div>
      <HomeBanner></HomeBanner>
      <MissionVission></MissionVission>
      <Statistics></Statistics>
      <Servicess></Servicess>
      <Partnership></Partnership>
      <HomeComments></HomeComments>
      <HomeContact></HomeContact>
      <HomeProjects></HomeProjects>

      <HomeBlogs></HomeBlogs>
    </div>
  );
};

export default HomePages;
