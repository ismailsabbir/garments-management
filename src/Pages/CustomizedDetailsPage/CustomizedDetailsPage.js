import React from "react";
import CustomizeDetailsBanner from "../../Components/CustomizeDetailsComponent/CustomizeDetailsBanner/CustomizeDetailsBanner";
import { useLoaderData } from "react-router-dom";
import SingleCustomize from "../../Components/CustomizeDetailsComponent/SingleCustomize/SingleCustomize";

const CustomizedDetailsPage = () => {
  const category = useLoaderData();
  console.log(category);
  return (
    <div>
      <CustomizeDetailsBanner></CustomizeDetailsBanner>
      <SingleCustomize category={category}></SingleCustomize>
    </div>
  );
};

export default CustomizedDetailsPage;
