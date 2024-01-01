import React, { useContext, useState } from "react";
import "./EmployeeAttendance.css";
import { Form, Table } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import { RiDeleteBinLine } from "react-icons/ri";
import NotFound from "../../../CommonComponents/NotFound/NotFound";
import Loading from "../../../CommonComponents/Loading/Loading";
import { EmployeeContext } from "./../../../Layouts/EmployeeLayouts/EmployeeLayouts";
import { useQuery } from "@tanstack/react-query";
import { BsSearch } from "react-icons/bs";
const EmployeeAttendance = () => {
  const employee = useContext(EmployeeContext);
  const [Attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [employeeid, setemployeeid] = useState(employee?.employee_id);
  const { data: productall = [], refetch } = useQuery({
    queryKey: [
      "specificAttendance",
      {
        employee_id: employeeid,
      },
    ],
    queryFn: () =>
      fetch(
        `${process.env.REACT_APP_URL}/specificAttendance?employee_id=${employeeid}`
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setAttendance(data);
          setLoading(false);
          return data;
        })
        .catch((error) => {
          console.error("Failed to fetch data:", error);
          setLoading(false);
        }),
  });
  return (
    <div>
      <div className="employee-attendance-search">
        <h5>Employee Attendance</h5>
        <Form
          // onSubmit={handleEmployIdSearch}
          className="name-search"
        >
          <input
            className="name-input-staff"
            type="date"
            placeholder="Search by Date"
            name="employeeId"
          />
          <button type="submit">
            <BsSearch></BsSearch>
          </button>
        </Form>
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
          {/* averageInTime, averageOutTime, averageWorkingTime */}
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
                        <th className="recent-order-hed">Action</th>
                      </tr>
                      <tbody>
                        {Attendance?.attendanceThisMonth?.map((attendance) => (
                          <tr>
                            <td className="das-order-data">
                              <span>{attendance?.attendance_date}</span>{" "}
                            </td>
                            <td className="das-order-data">
                              <span>{attendance?.attendance_in_time}</span>{" "}
                            </td>
                            <td className="das-order-data">
                              <span> {attendance?.attendance_out_time}</span>{" "}
                            </td>
                            <td className="das-order-data">
                              <span>{attendance?.totalDuration}</span>{" "}
                            </td>
                            <td className="das-order-data">
                              <span>Day</span>
                            </td>
                            <td className="das-order-data">
                              <span>
                                {attendance?.status_in === "present" &&
                                attendance?.status_out === "present"
                                  ? "Present"
                                  : attendance?.status_in === "present" ||
                                    attendance?.status_out === "present"
                                  ? "Half Day"
                                  : "Absence"}
                              </span>
                            </td>
                            <td className="das-order-data">
                              <div className="print-serach">
                                <Link
                                  to="/dashbord/employee/attendance/edit"
                                  state={attendance}
                                >
                                  <FiEdit className="printlogo"></FiEdit>
                                </Link>

                                <RiDeleteBinLine
                                  // onClick={() =>
                                  //   handledeleteAttendance(attendance)
                                  // }
                                  className="printlogo"
                                ></RiDeleteBinLine>
                              </div>
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

export default EmployeeAttendance;
