import React from "react";
import "./ServicesPage.css";
import ServicesBanner from "../../Components/ServicesComponents/ServicesBanner/ServicesBanner";
import Servicess from "../../Components/HomeComponents/Servicess/Servicess";
import Statistics from "../../Components/HomeComponents/Statistics/Statistics";
import HomeProjects from "../../Components/HomeComponents/HomeProjects/HomeProjects";
import HomeContact from "../../Components/HomeComponents/HomeContact/HomeContact";
const ServicesPage = () => {
  console.log("Service Page");
  return (
    <div>
      <ServicesBanner></ServicesBanner>
      <Servicess></Servicess>
      <Statistics></Statistics>
      <HomeProjects></HomeProjects>
      <HomeContact></HomeContact>
    </div>
  );
};

export default ServicesPage;
