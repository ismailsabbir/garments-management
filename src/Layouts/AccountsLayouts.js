import React from "react";
import MainNavbar from "../CommonComponents/MainNavbar/MainNavbar";
import Footer from "../CommonComponents/Footer/Footer";
import LeftManageAccounts from "../Components/AccountComponents/LeftManageAccounts/LeftManageAccounts";
import { Outlet } from "react-router-dom";
import "./AccountsLayouts.css";
const AccountsLayouts = () => {
  return (
    <div>
      <MainNavbar></MainNavbar>
      <div className="account-layouts-hole">
        <div className="accounts-layouts-con">
          <div className=" row">
            <div className=" account-layouts-left col col-12 col-lg-3 col-md-2 col-sm-12">
              <LeftManageAccounts></LeftManageAccounts>
            </div>
            <div className="account-layouts-right col col-12 col-lg-9 col-md-9 col-sm-12">
              <Outlet></Outlet>
            </div>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default AccountsLayouts;
