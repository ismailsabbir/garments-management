import React from "react";
import "./ServicesDetailsRight.css";
import MinProject from "../../ServicesComponents/MinProject/MinProject";
import ServicesList from "../ServicesList/ServicesList";
import SmallContact from "../SmallContact/SmallContact";
import BlogList from "../BlogList/BlogList";
import SocialMediaList from "../SocialMediaList/SocialMediaList";
const ServicesDetailsRight = () => {
  return (
    <div>
      <MinProject></MinProject>
      <ServicesList></ServicesList>
      <SmallContact></SmallContact>
      <BlogList></BlogList>
      <SocialMediaList></SocialMediaList>
    </div>
  );
};

export default ServicesDetailsRight;
