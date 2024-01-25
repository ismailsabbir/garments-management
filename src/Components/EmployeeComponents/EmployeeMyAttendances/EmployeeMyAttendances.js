import React, { useContext, useState } from "react";
import { EmployeeContext } from "../../../Layouts/EmployeeLayouts/EmployeeLayouts";
import { useQuery } from "@tanstack/react-query";
import { Form } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import Loading from "../../../CommonComponents/Loading/Loading";
import NotFound from "../../../CommonComponents/NotFound/NotFound";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { ToastContainer } from "react-toastify";
import "./EmployeeMyAttendance.css";
const EmployeeMyAttendances = () => {
  const employee = useContext(EmployeeContext);
  const [Attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [employeeid, setemployeeid] = useState(employee?.employee_id);
  const [attendance_date, setattendance_date] = useState("");
  const [reset, setreset] = useState(false);
  console.log("Employee My Attendance");
  const { data: productall = [], refetch } = useQuery({
    queryKey: [
      "myAttendance",
      {
        employee_id: employeeid,
        attendance_date: attendance_date,
        reset: reset,
      },
    ],
    queryFn: () =>
      fetch(
        `${process.env.REACT_APP_URL}/myAttendance?employee_id=${employeeid}&&attendance_date=${attendance_date}&&reset=${reset}`
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setAttendance(data);
          setLoading(false);
          return data;
        })
        .catch((error) => {
          console.error("Failed to fetch data:", error);
          setLoading(false);
        }),
  });
  const handleattendancedate = (e) => {
    e.preventDefault();
    const attendance_date = e.target.attendance_date.value;
    setattendance_date(attendance_date);
  };

  const handlereset = () => {
    setattendance_date("");
    setreset(true);
  };
  return (
    <div>
      <div className="employee-attendance-search">
        <h5>Employee Attendance</h5>
        <Form onSubmit={handleattendancedate} className="name-search">
          <input
            className="name-input-staff"
            type="date"
            placeholder="Search by Date"
            name="attendance_date"
          />
          <button type="submit">
            <BsSearch></BsSearch>
          </button>
        </Form>
        <button onClick={handlereset} className="employee_reset_btn">
          ReSet
        </button>
      </div>
      <div className="product-search-con employee-info-con-admin">
        <div className="employee-img-name">
          <img src={Attendance?.employeeinfo?.photo} alt="" />
          <div className="employee_informationss">
            <h6>{Attendance?.employeeinfo?.name}</h6>
            <p>{Attendance?.employeeinfo?.role}</p>
          </div>
        </div>
        <div>
          <h6>Employee ID</h6>
          <p>{Attendance?.employeeinfo?.employee_id}</p>
        </div>
        <div>
          <h6>Joining Date</h6>
          <p>{Attendance?.employeeinfo?.join_date}</p>
        </div>
        <div>
          <h6>Department</h6>
          <p>Garments</p>
        </div>
      </div>
      <div className="employee-working-time-con">
        <div className="employee-time-chart">
          <h3>{Attendance?.averageWorkingTime}</h3>
          <p>Average Working Hours</p>
        </div>
        <div className="employee-time-chart">
          <h3>{Attendance?.averageInTime}PM</h3>
          <p>Average In Time</p>
        </div>
        <div className="employee-time-chart">
          <h3>{Attendance?.averageOutTime}AM</h3>
          <p>Average Out Time</p>
        </div>
        <div className="employee-time-chart">
          <h3>01:00</h3>
          <p>Average Break Time</p>
        </div>
      </div>
      <div className="das-recent-order-con">
        {loading ? (
          <>
            <Loading></Loading>
          </>
        ) : (
          <>
            {Attendance?.attendanceThisMonth?.length < 1 ? (
              <>
                <NotFound></NotFound>
              </>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <div className="overflow-x-auto">
                    <table className="table recent-order-table">
                      <tr className="recent-order-tr">
                        <th className="recent-order-hed">Date</th>
                        <th className="recent-order-hed">Check In</th>
                        <th className="recent-order-hed">Check Out</th>
                        <th className="recent-order-hed">Working Hours</th>
                        <th className="recent-order-hed">Shift</th>
                        <th className="recent-order-hed">Status</th>
                      </tr>
                      <tbody>
                        {Attendance?.attendanceThisMonth?.map((attendance) => (
                          <tr>
                            <td className="das-order-data">
                              <span>{attendance?.attendance_date}</span>{" "}
                            </td>
                            <td className="das-order-data">
                              <span>
                                <p className="check_in_mobile">
                                  {attendance?.attendance_in_time}
                                </p>
                              </span>{" "}
                            </td>
                            <td className="das-order-data">
                              <span>
                                {" "}
                                <p className="check_in_mobile">
                                  {attendance?.attendance_out_time}
                                </p>
                              </span>{" "}
                            </td>
                            <td className="das-order-data">
                              <span>{attendance?.totalDuration}</span>{" "}
                            </td>
                            <td className="das-order-data">
                              <span>Day</span>
                            </td>
                            <td className="das-order-data">
                              <span>
                                <p className="check_in_mobile">
                                  {attendance?.status_in === "present" &&
                                  attendance?.status_out === "present"
                                    ? "Present"
                                    : attendance?.status_in === "present" ||
                                      attendance?.status_out === "present"
                                    ? "Half Day"
                                    : "Absence"}
                                </p>
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default EmployeeMyAttendances;
