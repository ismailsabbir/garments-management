import React, { useContext, useState } from "react";
import "./DashbordEmployeeAttendance.css";
import { ToastContainer } from "react-toastify";
import { Form } from "react-bootstrap";
import NotFound from "../../../CommonComponents/NotFound/NotFound";
import Loading from "../../../CommonComponents/Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { AdminContext } from "../../../Layouts/DashbordLayouts/DashbordLayouts";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
const DashbordEmployeeAttendance = () => {
  const [Attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  const employee = useContext(AdminContext);
  console.log(employee);

  const { data: productall = [], refetch } = useQuery({
    //  employee_id=${employee_id}
    queryKey: [
      "specificAttendance",
      {
        employee_id: employee?.employee_id,
      },
    ],
    queryFn: () =>
      fetch(
        `${process.env.REACT_APP_URL}/specificAttendance?employee_id=${employee?.employee_id}`
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
  console.log(Attendance);
  return (
    <div>
      <div className="das-recent-order-con">
        <h5>Employee Attendance</h5>

        <div className="product-search-con employee-info-con-admin">
          <div className="employee-img-name">
            <img src={Attendance?.employeeinfo?.photo} alt="" />
            <div>
              <h6>{Attendance?.employeeinfo?.name}</h6>
              <p>{Attendance?.employeeinfo?.role}</p>
            </div>
          </div>
          <div>
            <h4>Employee ID</h4>
            <p>{Attendance?.employeeinfo?.employee_id}</p>
          </div>
          <div>
            <h4>Joining Date</h4>
            <p>{Attendance?.employeeinfo?.join_date}</p>
          </div>
          <div>
            <h4>Department</h4>
            <p>Garments</p>
          </div>
        </div>
        <div className="employee-working-time-con">
          <div>
            {/* averageInTime, averageOutTime, averageWorkingTime */}
            <h1>{Attendance?.averageWorkingTime}</h1>
            <p>Average Working Hours</p>
          </div>
          <div>
            <h1>{Attendance?.averageInTime}PM</h1>
            <p>Average In Time</p>
          </div>
          <div>
            <h1>{Attendance?.averageOutTime}AM</h1>
            <p>Average Out Time</p>
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
                                //   to="/dashbord/shop-product-edit"
                                //   state={order}
                                >
                                  <FiEdit className="printlogo"></FiEdit>
                                </Link>

                                <RiDeleteBinLine
                                  //   onClick={() => handledeletecategory(order)}
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

export default DashbordEmployeeAttendance;
