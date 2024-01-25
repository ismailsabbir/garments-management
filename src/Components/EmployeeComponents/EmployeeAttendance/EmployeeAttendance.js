import React, { useContext, useState } from "react";
import "./EmployeeAttendance.css";
import { Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import { RiDeleteBinLine } from "react-icons/ri";
import NotFound from "../../../CommonComponents/NotFound/NotFound";
import Loading from "../../../CommonComponents/Loading/Loading";
import { EmployeeContext } from "./../../../Layouts/EmployeeLayouts/EmployeeLayouts";
import { useQuery } from "@tanstack/react-query";
import { BsSearch } from "react-icons/bs";
import Swal from "sweetalert2";
const EmployeeAttendance = () => {
  const employee = useContext(EmployeeContext);
  const [Attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [employeeid, setemployeeid] = useState(employee?.employee_id);
  console.log("Employee Attendance");
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
          setAttendance(data);
          setLoading(false);
          return data;
        })
        .catch((error) => {
          console.error("Failed to fetch data:", error);
          setLoading(false);
        }),
  });
  const handledeleteAttendance = (attendance) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to delate this!",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "DELATE",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `${process.env.REACT_APP_URL}/delete-employee-attendance/${attendance?._id}`,
          {
            method: "DELETE",
            headers: {
              "Content-type": "application/json",
              authorization: `Beare ${localStorage.getItem("garments-token")}`,
            },

            body: JSON.stringify(attendance),
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data?.deletedCount > 0) {
              toast("Attendance delete sucessfully !!!", {
                position: "top-center",
                autoClose: 1000,
              });
            }
            refetch();
          });
      }
    });
  };
  const handleEmployIdSearch = (e) => {
    e.preventDefault();
    setemployeeid(e.target.employeeId.value);
  };
  return (
    <div>
      <div className="das-recent-order-con">
        <div className="employee-attendance-search">
          <h5>Employee Attendance</h5>
          <Form onSubmit={handleEmployIdSearch} className="name-search">
            <input
              className="name-input-staff"
              type="text"
              placeholder="Search by Employee_id"
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
                                  {" "}
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
                            <td className="das-order-data">
                              <div className="print-serach">
                                <Link
                                  to="/dashbord/employee/attendance/edit"
                                  state={attendance}
                                >
                                  <FiEdit className="printlogo"></FiEdit>
                                </Link>

                                <RiDeleteBinLine
                                  onClick={() =>
                                    handledeleteAttendance(attendance)
                                  }
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
