import React from "react";
import "./DashbordEmployeeSalaryAdd.css";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentComponent from "../PaymentComponent/PaymentComponent";
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
const DashbordEmployeeSalaryAdd = () => {
  const location = useLocation();
  const employee = location.state;
  const employeeid = employee?.employee_id;
  const salary = employee?.salary;

  return (
    <div className="employee_salary_form">
      <h5>Employee Payment System</h5>
      <div className="employee_information">
        <img src={employee?.photo} alt="" />
        <p>Name: {employee?.name}</p>
        <p>Employee Id: {employee?.employee_id}</p>
        <p>Salary: {employee?.salary}</p>
      </div>

      <Elements stripe={stripePromise}>
        <PaymentComponent employeeId={employee} amount={salary} />
      </Elements>
    </div>
  );
};

export default DashbordEmployeeSalaryAdd;
