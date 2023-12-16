import React from "react";
import MainNavbar from "../../CommonComponents/MainNavbar/MainNavbar";
import { Outlet } from "react-router-dom";
import Footer from "../../CommonComponents/Footer/Footer";
import EmployeeLeft from "../../Components/EmployeeComponents/EmployeeLeft/EmployeeLeft";

const EmployeeLayouts = () => {
  return (
    <div className="dashbord-layut-hole">
      <MainNavbar></MainNavbar>
      <div className="row dashbord-layut-con">
        <div className="col col-12 col-sm-12 col-md-12 col-lg-2 dashbord-layout-left">
          <EmployeeLeft></EmployeeLeft>
        </div>
        <div className="col col-12 col-sm-12 col-md-12 col-lg-10 dashbordlayout-right">
          <Outlet></Outlet>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default EmployeeLayouts;
