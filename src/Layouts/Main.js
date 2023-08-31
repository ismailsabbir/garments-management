import React from "react";
import { Outlet } from "react-router-dom";
import MainNavbar from "../CommonComponents/MainNavbar/MainNavbar";
import Footer from "../CommonComponents/Footer/Footer";

const Main = () => {
  return (
    <div>
      <MainNavbar></MainNavbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Main;
