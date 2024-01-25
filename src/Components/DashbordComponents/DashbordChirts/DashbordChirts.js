import React, { useEffect, useState } from "react";
import { XAxis, YAxis, Tooltip, BarChart, Legend, Bar } from "recharts";
import "./DashbordChirts.css";
const DashbordChirts = () => {
  const [data, setdata] = useState([]);
  const [data1, setdata1] = useState([]);
  console.log("Dashbord Chirt");
  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/weeklyordersl`)
      .then((res) => res.json())
      .then((data) => {
        setdata(data);
      });
  }, []);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/weeklycustomorders`)
      .then((res) => res.json())
      .then((data) => {
        setdata1(data);
      });
  }, []);

  return (
    <div className="dash-chirt-con">
      <div className="chart-container">
        <p className="groth-text">10 Days Sales</p>
        <div className="row chart_containers">
          <div className="col col-12 col-sm-12 col-md-6 col-lg-6 chart_container_mobile">
            <h6 className="progressratio">
              Main product sale rate statistics.
            </h6>
            <BarChart
              width={400}
              height={300}
              data={data}
              margin={{
                top: 5,
                // right: 30,
                // left: 20,
                bottom: 5,
              }}
              barSize={20}
              className="barchart_mobile"
            >
              <XAxis
                dataKey="name"
                scale="point"
                padding={{
                  left: 10,
                  right: 10,
                }}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pv" fill="#8884d8" background={{ fill: "#eee" }} />
            </BarChart>
          </div>
          <div className="col col-12 col-sm-12 col-md-6 col-lg-6 chart_container_mobile">
            <h6 className="progressratio">
              Customized product sale rate statistics.
            </h6>
            <BarChart
              width={400}
              height={300}
              data={data1}
              margin={{
                top: 5,
                // right: 30,
                // left: 20,
                bottom: 5,
              }}
              barSize={20}
              className="barchart_mobile"
            >
              <XAxis
                dataKey="name"
                scale="point"
                padding={{ left: 10, right: 10 }}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pv" fill="#8884d8" background={{ fill: "#eee" }} />
            </BarChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashbordChirts;
