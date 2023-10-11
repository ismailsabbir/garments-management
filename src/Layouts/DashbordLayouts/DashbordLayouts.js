import React from "react";
import "./DashbordLayouts.css";
import { Outlet } from "react-router-dom";
import MainNavbar from "../../CommonComponents/MainNavbar/MainNavbar";
import Footer from "../../CommonComponents/Footer/Footer";
import DashbordLeft from "../../Components/DashbordComponents/DashbordLeft/DashbordLeft";
import "./DashbordLayouts.css";
const DashbordLayouts = () => {
  return (
    <div className="dashbord-layut-hole">
      <MainNavbar></MainNavbar>
      <div className="row dashbord-layut-con">
        <div className="col col-12 col-sm-12 col-md-12 col-lg-2 dashbord-layout-left">
          <DashbordLeft></DashbordLeft>
        </div>
        <div className="col col-12 col-sm-12 col-md-12 col-lg-10 dashbordlayout-right">
          <Outlet></Outlet>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default DashbordLayouts;
