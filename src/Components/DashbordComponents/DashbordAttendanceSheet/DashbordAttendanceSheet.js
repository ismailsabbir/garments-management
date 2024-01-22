import React, { useState } from "react";
import "./DashbordAttendanceSheet.css";
import { useQuery } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { IoIosStar } from "react-icons/io";
import NotFound from "../../../CommonComponents/NotFound/NotFound";
import Loading from "../../../CommonComponents/Loading/Loading";
import { Form } from "react-bootstrap";
import { RxCross2 } from "react-icons/rx";
import { TbStarHalfFilled } from "react-icons/tb";
import { FaCheck } from "react-icons/fa";

const DashbordAttendanceSheet = () => {
  const [currentpage, setcurrentpage] = useState(0);
  const [datasize, setdatasize] = useState(10);
  const [count, setcount] = useState(0);
  const page = Math.ceil(count / datasize);
  const [loading, setLoading] = useState(true);
  const [attendanceSheet, setAttendanceSheet] = useState([]);
  const [reset, setreset] = useState(false);
  const [employeeId, setEmployeeID] = useState("");
  const { data: productall = [], refetch } = useQuery({
    queryKey: [
      "allcustomizedorders",
      {
        page: currentpage,
        size: datasize,
        reset: reset,
        employeeId: employeeId,
      },
    ],
    queryFn: () =>
      fetch(
        `${process.env.REACT_APP_URL}/attendanceSheet?page=${currentpage}&size=${datasize}&employeeId=${employeeId}&reset=${reset}`
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setAttendanceSheet(data?.attendanceSheet);
          setcount(data?.count);
          setLoading(false);
          return data;
        })
        .catch((error) => {
          console.error("Failed to fetch data:", error);
          setLoading(false);
        }),
  });
  const datesArray = attendanceSheet[0]?.attendance?.map((item) =>
    item?.date?.substring(0, 2)
  );
  const handleEmployeesearch = (e) => {
    e.preventDefault();
    const serchvalue = e.target.employeeName.value;
    setreset(false);
    setEmployeeID(serchvalue);
  };
  const handlereset = () => {
    setEmployeeID("");
    setreset(true);
  };
  console.log(datesArray);
  const handleStartDateChange = (e) => {
    console.log(e);
  };
  return (
    <div>
      <div className="das-recent-order-con">
        <h5 className="mb-6">Attendance Sheet</h5>
        <div className="order-search-con">
          <div className="order-status-limit">
            <input
              className="date-chose"
              type="date"
              name="startday"
              placeholder="Search Product"
              onChange={(e) => handleStartDateChange(e.target.value)}
            />
            <input
              className="date-chose"
              type="date"
              placeholder="Search Product"
              // value={endDate}
              // onChange={handleEndDateChange}
            />
            <Form onSubmit={handleEmployeesearch} className="employy-name">
              <input
                className="employee-name-input"
                type="text"
                name="employeeName"
                placeholder="Search Employee ID"
              />
            </Form>

            <button
              onClick={handlereset}
              className="product-reset"
              id="order-reset-btn"
            >
              ReSet
            </button>
          </div>
        </div>
        {loading ? (
          <>
            <Loading></Loading>
          </>
        ) : (
          <>
            {attendanceSheet?.length < 1 ? (
              <>
                <NotFound></NotFound>
              </>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <div className="overflow-x-auto">
                    <table className="table recent-order-table">
                      <tr className="recent-order-tr">
                        <th className="recent-order-hed">Employee Name</th>
                        {attendanceSheet[0]?.attendance
                          ?.map((item) => item?.date?.substring(0, 2))
                          .map((day) => (
                            <th className="recent-order-hed">{day}</th>
                          ))}
                      </tr>
                      <tbody>
                        {attendanceSheet?.map((attendance) => (
                          <tr>
                            <td className="das-order-data ">
                              <span className="img-name">
                                <img src={attendance?.photo} alt="" />
                                <h6> {attendance?.name}</h6>
                              </span>{" "}
                            </td>
                            {attendance?.attendance.map((status) => (
                              <td className="das-order-data">
                                {(() => {
                                  switch (status?.symbol) {
                                    case "*":
                                      return (
                                        <span>
                                          <IoIosStar className="attendance-star" />
                                        </span>
                                      );
                                    case "A":
                                      return (
                                        <span>
                                          <RxCross2 className="attendance-cros" />
                                        </span>
                                      );
                                    case "P":
                                      return (
                                        <span>
                                          <FaCheck className="attendance-present" />
                                        </span>
                                      );
                                    case "HP":
                                      return (
                                        <span>
                                          <TbStarHalfFilled className="attendance_half" />
                                        </span>
                                      );
                                    default:
                                      return <>Unknown</>; // Or handle other cases as needed
                                  }
                                })()}
                              </td>
                            ))}
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

export default DashbordAttendanceSheet;
