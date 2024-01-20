import React, { useContext, useEffect, useState } from "react";
import "./EmployeeHome.css";
import { TiTick } from "react-icons/ti";
import { BsFileBreak } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import "./EmployeeHome.css";
import EmployeeChirsts from "../EmployeeChirsts/EmployeeChirsts";
import { EmployeeContext } from "../../../Layouts/EmployeeLayouts/EmployeeLayouts";
import { AuthContext } from "../../../Context/UserContext";
const EmployeeHome = () => {
  const employee = useContext(EmployeeContext);
  const { userlogout } = useContext(AuthContext);
  const [employeeinfo, setemployeeinfo] = useState([]);
  const [weekattendance, setweekattendance] = useState([]);
  console.log(employee?.employee_id);
  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_URL}/singleAttendance/${employee?.employee_id}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data?.sucess) {
          setemployeeinfo(data?.result);
        }
      });
  }, []);
  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_URL}/weekAttendance/${employee?.employee_id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setweekattendance(data);
      });
  }, []);
  console.log(employeeinfo);
  return (
    <div className="employee_static-con">
      <div className="number-of-orders" id="employee-presence">
        <div className="first-num-order">
          <div className="das-order-div">
            <TiTick className="das-order-logo"></TiTick>
          </div>
          <div className="order-num-info">
            <span>Total IN Presence</span>
            <h3>{employeeinfo?.status_in_present}</h3>
          </div>
        </div>
        <div className="first-num-order">
          <div className="das-order-div">
            <RxCross2 className="das-order-logo" />
          </div>

          <div className="order-num-info">
            <span>Total Out Presence</span>
            <h3>{employeeinfo?.status_out_present}</h3>
          </div>
        </div>
        <div className="first-num-order">
          <div className="das-order-div">
            <BsFileBreak className="das-order-logo"></BsFileBreak>
          </div>

          <div className="order-num-info">
            <span>Total IN Absence</span>
            <h3>{employeeinfo?.status_in_absence}</h3>
          </div>
        </div>
        <div className="first-num-order">
          <div className="das-order-div">
            <BsFileBreak className="das-order-logo"></BsFileBreak>
          </div>

          <div className="order-num-info">
            <span>Total Out Absence</span>
            <h3>{employeeinfo?.status_out_absence}</h3>
          </div>
        </div>
      </div>
      <EmployeeChirsts></EmployeeChirsts>
    </div>
  );
};

export default EmployeeHome;
