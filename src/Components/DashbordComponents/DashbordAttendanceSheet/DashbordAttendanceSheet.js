import React, { useState } from "react";
import "./DashbordAttendanceSheet.css";
import { useQuery } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { BiPrinter } from "react-icons/bi";
import { Link } from "react-router-dom";
import { IoIosCheckmark, IoIosStar, IoMdCheckmark } from "react-icons/io";
import NotFound from "../../../CommonComponents/NotFound/NotFound";
import Loading from "../../../CommonComponents/Loading/Loading";
import { Form } from "react-bootstrap";
import { RxCross2 } from "react-icons/rx";
const DashbordAttendanceSheet = () => {
  const [currentpage, setcurrentpage] = useState(0);
  const [datasize, setdatasize] = useState(5);
  const [count, setcount] = useState(0);
  const page = Math.ceil(count / datasize);
  const [loading, setLoading] = useState(true);
  const [attendanceSheet, setAttendanceSheet] = useState([]);
  const { data: productall = [], refetch } = useQuery({
    queryKey: [
      "allcustomizedorders",
      {
        page: currentpage,
        size: datasize,
      },
    ],
    queryFn: () =>
      fetch(
        `${process.env.REACT_APP_URL}/attendanceSheet?page=${currentpage}&size=${datasize}`
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

  console.log(datesArray);
  return (
    <div>
      <div className="das-recent-order-con">
        <h5 className="mb-6">Attendance Sheet</h5>
        <div className="order-search-con">
          <div className="order-status-limit">
            <input
              className="date-chose"
              type="date"
              placeholder="Search Product"
              // value={startDate}
              // onChange={handleStartDateChange}
            />
            <input
              className="date-chose"
              type="date"
              placeholder="Search Product"
              // value={endDate}
              // onChange={handleEndDateChange}
            />
            <Form
              // onSubmit={handlecustomersearch}
              className="employy-name"
            >
              <input
                className="employee-name-input"
                type="text"
                name="name"
                placeholder="Search Employee Name"
              />
            </Form>

            <button
              // onClick={handlereset}
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
                                          <IoMdCheckmark className="attendance-present" />
                                        </span>
                                      );
                                    case "HP":
                                      return (
                                        <span>
                                          <IoIosCheckmark />
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
