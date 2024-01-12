import React, { useEffect, useState } from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  PieChart,
  Pie,
  ResponsiveContainer,
  BarChart,
  Legend,
  Bar,
} from "recharts";
import "./DashbordChirts.css";
// const data = [
//   { name: "Taskstats", uv: 90, pv: 100, amt: 100 },
//   { name: "AI project", uv: 20, pv: 100, amt: 100 },
//   { name: "Mobile App", uv: 100, pv: 100, amt: 100 },
//   { name: "UI Design", uv: 40, pv: 100, amt: 100 },
//   { name: "Software", uv: 10, pv: 100, amt: 100 },
//   { name: "Machine", uv: 40, pv: 100, amt: 100 },
// ];
const data01 = [
  { name: "Taskstats", value: 90 },
  { name: "Ai Project", value: 20 },
  { name: "Mobile App", value: 100 },
  { name: "UI Design", value: 40 },
  { name: "Software", value: 10 },
  { name: "Machine", value: 40 },
];

const DashbordChirts = () => {
  const [data, setdata] = useState([]);
  const [data1, setdata1] = useState([]);

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
          <div className="col col-12 col-sm-12 col-md-6 col-lg-6">
            <h6 className="progressratio">
              Main product sale rate statistics.
            </h6>
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
              <Bar dataKey="pv" fill="#8884d8" background={{ fill: "#eee" }} />
            </BarChart>

            {/* <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                width={500}
                height={400}
                data={data}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
                className="areachart"
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="uv"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
              </AreaChart>
            </ResponsiveContainer> */}
          </div>

          <div className="col col-12 col-sm-12 col-md-6 col-lg-6">
            <h6 className="progressratio">
              Customized product sale rate statistics.
            </h6>
            <BarChart
              width={400}
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
              <Bar dataKey="pv" fill="#8884d8" background={{ fill: "#eee" }} />
            </BarChart>

            {/* <ResponsiveContainer width="100%" height={300}>
              <PieChart width={500} height={400} className="piechart">
                <Pie
                  dataKey="value"
                  isAnimationActive={false}
                  data={data01}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashbordChirts;
