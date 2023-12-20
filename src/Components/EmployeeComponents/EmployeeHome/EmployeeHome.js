import React from "react";
import "./EmployeeHome.css";
import { TiTick } from "react-icons/ti";
import { GrDeliver } from "react-icons/gr";
import { BsFileBreak } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";

import "./EmployeeHome.css";
import EmployeeChirsts from "../EmployeeChirsts/EmployeeChirsts";
const EmployeeHome = () => {
  return (
    <div className="employee_static-con">
      <div className="number-of-orders" id="employee-presence">
        <div className="first-num-order">
          <div className="das-order-div">
            <TiTick className="das-order-logo"></TiTick>
          </div>
          <div className="order-num-info">
            <span>Total Presence</span>
            <h3>396</h3>
          </div>
        </div>
        <div className="first-num-order">
          <div className="das-order-div">
            <RxCross2 className="das-order-logo" />
          </div>

          <div className="order-num-info">
            <span>Total Absesence</span>
            <h3>396</h3>
          </div>
        </div>
        <div className="first-num-order">
          <div className="das-order-div">
            <BsFileBreak className="das-order-logo"></BsFileBreak>
          </div>

          <div className="order-num-info">
            <span>Available Leaves</span>
            <h3>396</h3>
          </div>
        </div>
        <div className="first-num-order">
          <div className="das-order-div">
            <BsFileBreak className="das-order-logo"></BsFileBreak>
          </div>

          <div className="order-num-info">
            <span>Total Leaves</span>
            <h3>396</h3>
          </div>
        </div>
      </div>
      <EmployeeChirsts></EmployeeChirsts>
    </div>
  );
};

export default EmployeeHome;
