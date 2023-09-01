import React from "react";
import "./AboutUs.css";
import AboutBanner from "../../Components/AboutusComponents/AboutBanner/AboutBanner";
import MissionVission from "./../../Components/HomeComponents/MissionVission/MissionVission";
import Partnership from "./../../Components/HomeComponents/Partnership/Partnership";
import HomeComments from "./../../Components/HomeComponents/HomeComments/HomeComments";
import HomeContact from "./../../Components/HomeComponents/HomeContact/HomeContact";
import TeamMembers from "../../Components/AboutusComponents/TeamMembers/TeamMembers";
const AboutUs = () => {
  return (
    <div>
      <AboutBanner></AboutBanner>
      <MissionVission></MissionVission>
      <Partnership></Partnership>
      <HomeComments></HomeComments>
      <HomeContact></HomeContact>
      <TeamMembers></TeamMembers>
    </div>
  );
};

export default AboutUs;
