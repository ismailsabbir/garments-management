import React from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  PieChart,
  Pie,
  ResponsiveContainer,
} from "recharts";
const data = [
  { name: "Taskstats", uv: 0, pv: 100, amt: 100 },
  { name: "Saturday", uv: 50, pv: 100, amt: 100 },
  { name: "Sunday", uv: 20, pv: 100, amt: 100 },
  { name: "Monday", uv: 40, pv: 100, amt: 100 },
  { name: "Tuesday", uv: 20, pv: 100, amt: 100 },
  { name: "Wednesday", uv: 40, pv: 100, amt: 100 },
  { name: "Thursday", uv: 5, pv: 100, amt: 100 },
];
const data01 = [
  { name: "Taskstats", value: 90 },
  { name: "Ai Project", value: 20 },
  { name: "Mobile App", value: 100 },
  { name: "UI Design", value: 40 },
  { name: "Software", value: 10 },
  { name: "Machine", value: 40 },
];
const EmployeeChirsts = () => {
  return (
    <div className="dash-chirt-con">
      <div className="chart-container">
        <p className="groth-text">Task Groth</p>
        <h6 className="progressratio">70% progress</h6>
        <div className="row">
          <div className="col col-12 col-sm-12 col-md-6 col-lg-6">
            <ResponsiveContainer width="100%" height={300}>
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
            </ResponsiveContainer>
          </div>

          <div className="col col-12 col-sm-12 col-md-6 col-lg-6">
            <ResponsiveContainer width="100%" height={300}>
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
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeChirsts;
