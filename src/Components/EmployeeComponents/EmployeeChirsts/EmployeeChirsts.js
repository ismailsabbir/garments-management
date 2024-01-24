import React, { useContext, useEffect, useState } from "react";
import { XAxis, YAxis, Tooltip, BarChart, Legend, Bar } from "recharts";
import { EmployeeContext } from "../../../Layouts/EmployeeLayouts/EmployeeLayouts";
import "./EmployeeChirsts.css";
const EmployeeChirsts = () => {
  const employee = useContext(EmployeeContext);
  const [data, setdata] = useState([]);
  const [data1, setdata1] = useState([]);

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_URL}/monthAttendance/${employee?.employee_id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setdata1(data);
      });
  }, []);
  console.log(data);
  const currentDate = new Date();

  const options = {
    month: "long",
    year: "numeric",
  };

  const formattedDate = currentDate.toLocaleDateString("en-US", options);
  console.log(formattedDate);
  return (
    <div className="dash-chirt-con">
      <div className="chart-container">
        <p className="groth-text">Current Month Working Durations</p>
        <div className="row chart_containers">
          {/* <div className="col col-12 col-sm-12 col-md-6 col-lg-6">
            <h6 className="progressratio">{employee?.name} attendance list</h6>
            <BarChart
              width={400}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
              barSize={20}
            >
              <XAxis
                dataKey="name"
                scale="point"
                padding={{ left: 10, right: 10 }}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="duration"
                fill="#8884d8"
                background={{ fill: "#eee" }}
              />
            </BarChart>
          </div> */}
          <div className="col col-12 col-sm-12 col-md-6 col-lg-12 employee_chirt">
            <h6 className="progressratio">
              {formattedDate} ,{employee?.name} Working Duration
            </h6>
            <BarChart
              width={1200}
              height={300}
              data={data1}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
              barSize={20}
            >
              <XAxis
                dataKey="name"
                scale="point"
                padding={{ left: 10, right: 10 }}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="duration"
                fill="#8884d8"
                background={{ fill: "#eee" }}
              />
            </BarChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeChirsts;
