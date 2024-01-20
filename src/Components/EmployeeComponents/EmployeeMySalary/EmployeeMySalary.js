import React, { useContext, useEffect, useState } from "react";
import "./EmployeeMySalary.css";
import { EmployeeContext } from "../../../Layouts/EmployeeLayouts/EmployeeLayouts";
const EmployeeMySalary = () => {
  const [salary, setsalary] = useState([]);
  const employee = useContext(EmployeeContext);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/mysalary/${employee?.employee_id}`)
      .then((res) => res.json())
      .then((data) => setsalary(data));
  }, []);

  return (
    <div>
      <h5>My Salary</h5>
      <div className="row salary_container">
        {salary?.map((salary) => (
          <div className="col col-12 col-sm-6 col-lg-3 col-md-6 salary_con">
            <h5>{salary?.paymentStatus}</h5>
            <p>
              <span>Tran Id:</span> {salary?.tran_id}
            </p>
            <p>
              <span>Id:</span> {salary?.payId}
            </p>
            <p>
              <span>Salary:</span> {salary?.salary}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeMySalary;
