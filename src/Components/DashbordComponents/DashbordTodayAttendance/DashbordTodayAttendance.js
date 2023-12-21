import React, { useContext, useState } from "react";
import { Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import Loading from "../../../CommonComponents/Loading/Loading";
import NotFound from "../../../CommonComponents/NotFound/NotFound";

import { AuthContext } from "../../../Context/UserContext";
import { useQuery } from "@tanstack/react-query";
import "./DashbordTodayAttendance.css";
const DashbordTodayAttendance = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [todayAttendance, setTodayAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setsearch] = useState("");
  const [reset, setreset] = useState(false);
  const [status, setstatus] = useState();
  const [employeeId, setEmployeeID] = useState();
  const [currentpage, setcurrentpage] = useState(0);
  const [datasize, setdatasize] = useState(5);
  const [count, setcount] = useState(0);
  const page = Math.ceil(count / datasize);

  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_URL}/today/attendance`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setTodayAttendance(data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);
  const { data: productall = [], refetch } = useQuery({
    // &search=${search}&reset=${reset}&status=${status}&employeeId=${employeeId}
    queryKey: [
      "todayAttendance",
      {
        search: search,
        page: currentpage,
        size: datasize,
        reset: reset,
        status: status,
        employeeId: employeeId,
      },
    ],
    queryFn: () =>
      fetch(
        `${process.env.REACT_APP_URL}/todayAttendance?page=${currentpage}&size=${datasize}`
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setTodayAttendance(data?.attendance);
          setcount(data?.count);
          setLoading(false);
          return data;
        })
        .catch((error) => {
          console.error("Failed to fetch data:", error);
          setLoading(false);
        }),
  });

  console.log(todayAttendance);
  async function triggerAttendanceCheck() {
    try {
      setIsSubmitting(true);
      await fetch(`${process.env.REACT_APP_URL}/triggerAttendanceCheck`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setIsSubmitting(false);
          refetch();
          if (data?.sucess) {
            toast("Make absentees who are not present sucessfully!!!", {
              position: "top-center",
              autoClose: 1000,
            });
          }
        })
        .catch((error) => {
          setIsSubmitting(false);
          console.log(error);
          toast("Try again!!!", {
            position: "top-center",
            autoClose: 1000,
          });
        });
    } catch (error) {
      setIsSubmitting(false);
      console.error("Error:", error.message);
      toast("Try again!!!", {
        position: "top-center",
        autoClose: 1000,
      });
    }
  }

  const handleEmployeesearch = (e) => {
    e.preventDefault();
    const serchvalue = e.target.employeeName.value;
    setreset(false);
    setsearch(serchvalue);
  };
  const handleEmployIdSearch = (e) => {
    e.preventDefault();
    const employeeId = e.target.employeeId.value;
    setEmployeeID(employeeId);
  };
  const handlereset = () => {
    setsearch(false);
    setreset(true);
  };
  console.log(isSubmitting);
  return (
    <div>
      <div className="das-recent-order-con">
        <h5>Today Attendance</h5>
        <div className="absence-btn-con">
          <button
            className=" attendance-btn1"
            variant="primary"
            onClick={triggerAttendanceCheck}
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "processing...."
              : "Make absentees who are not present"}
          </button>
        </div>

        <div className="product-search-con">
          <Form onSubmit={handleEmployeesearch} className="serch-form">
            <input
              className="product-search"
              type="text"
              placeholder="Search By Name"
              name="employeeName"
            />
          </Form>
          <Form onSubmit={handleEmployIdSearch} className="serch-form">
            <input
              className="product-search"
              type="text"
              placeholder="Search By Employee ID"
              name="employeeId"
            />
          </Form>
          <select
            className="product-category-search"
            id="cars"
            onChange={(e) => setstatus(e.target.value)}
          >
            <option value="norm" selected>
              Search Status
            </option>
            <option value="present">Present</option>
            <option value="absence">Absence</option>
          </select>

          <button onClick={handlereset} className="product-reset">
            ReSet
          </button>
        </div>

        {loading ? (
          <>
            <Loading></Loading>
          </>
        ) : (
          <>
            {todayAttendance?.length < 1 ? (
              <>
                <NotFound></NotFound>
              </>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <div className="overflow-x-auto">
                    <table className="table recent-order-table">
                      <tr className="recent-order-tr">
                        <th className="recent-order-hed">Image</th>
                        <th className="recent-order-hed">Name</th>
                        <th className="recent-order-hed">ID</th>
                        <th className="recent-order-hed">First In</th>
                        <th className="recent-order-hed">Status In</th>
                        <th className="recent-order-hed">Last Out</th>
                        <th className="recent-order-hed">Status Out</th>
                        <th className="recent-order-hed">Total</th>
                        <th className="recent-order-hed">Status</th>
                        <th className="recent-order-hed">Shift</th>
                      </tr>
                      <tbody>
                        {todayAttendance?.map((attendance) => (
                          <tr>
                            <td className="das-order-data">
                              <span>
                                <img
                                  className="addendance-staff-img"
                                  src={attendance?.photo}
                                  alt=""
                                />
                              </span>{" "}
                            </td>
                            <td className="das-order-data">
                              <span>{attendance?.name}</span>{" "}
                            </td>
                            <td className="das-order-data">
                              <span>{attendance?.employee_id}</span>{" "}
                            </td>
                            <td className="das-order-data">
                              <span>{attendance?.attendance_in_time}</span>{" "}
                            </td>
                            <td className="das-order-data">
                              <span
                                className={
                                  attendance?.status_in === "present"
                                    ? "present-style"
                                    : "absence-style"
                                }
                              >
                                {attendance?.status_in}
                              </span>{" "}
                            </td>
                            <td className="das-order-data">
                              <span>
                                {" "}
                                {attendance?.attendance_out_time
                                  ? attendance?.attendance_out_time
                                  : "00:00 PM"}
                              </span>{" "}
                            </td>
                            <td className="das-order-data">
                              <span
                                className={
                                  attendance?.status_out === "present"
                                    ? "present-style"
                                    : "absence-style"
                                }
                              >
                                {attendance?.status_out}
                              </span>{" "}
                            </td>
                            <td className="das-order-data">
                              <span>{attendance?.totalDuration}</span>
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
                              <span>Day Shift</span>
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
        <div className="pagination-con">
          {[...Array(page).keys()].map((number) => (
            <button
              key={number}
              className={currentpage === number && "selected-page-btn"}
              id="paginationbtn"
              onClick={() => setcurrentpage(number)}
            >
              {number}
            </button>
          ))}
          <select
            onChange={(e) => setdatasize(e.target.value)}
            className="select1 select-bordered "
            id="datasize-select-btn"
          >
            <option value="2" selected>
              2
            </option>
            <option value="5" selected>
              5
            </option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default DashbordTodayAttendance;
