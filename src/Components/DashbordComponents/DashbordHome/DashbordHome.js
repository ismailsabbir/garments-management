import React from "react";
import "./DashbordHome.css";
import DashbordhomeFirst from "../../DashbordhomeFirst/DashbordhomeFirst";
import DashboardRecentOrder from "../DashboardRecentOrder/DashboardRecentOrder";
const DashbordHome = () => {
  return (
    <div className="dashbord-home-con">
      <h4>Dashboard Overview</h4>
      <DashbordhomeFirst></DashbordhomeFirst>
      <DashboardRecentOrder></DashboardRecentOrder>
    </div>
  );
};

export default DashbordHome;
