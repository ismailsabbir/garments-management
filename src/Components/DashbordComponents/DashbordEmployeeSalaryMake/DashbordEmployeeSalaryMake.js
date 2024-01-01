import React, { useState } from "react";
import "./DashbordEmployeeSalaryMake.css";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { BsSearch } from "react-icons/bs";
import { Form } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../CommonComponents/Loading/Loading";
import NotFound from "../../../CommonComponents/NotFound/NotFound";
const DashbordEmployeeSalaryMake = () => {
  const [staffs, setstaffs] = useState([]);
  const [searchvalue, setsearchvalue] = useState("");
  const [loading, setloading] = useState(true);
  const [currentpage, setcurrentpage] = useState(0);
  const [datasize, setdatasize] = useState(10);
  const [count, setcount] = useState(0);
  const page = Math.ceil(count / datasize);
  const currentMonth = new Date().toLocaleString("en-us", {
    month: "long",
  });
  const { data: products = [], refetch } = useQuery({
    queryKey: [
      "staff",
      {
        search: searchvalue,
        page: currentpage,
        size: datasize,
      },
    ],
    queryFn: () =>
      fetch(
        `${process.env.REACT_APP_URL}/staff_name?search=${searchvalue}&&page=${currentpage}&&size=${datasize}`,
        {
          headers: {
            authorization: `Beare ${localStorage.getItem("garments-token")}`,
          },
        }
      )
        .then((req) => req.json())
        .then((data) => {
          setstaffs(data.result);
          setcount(data?.count);
          setloading(false);
          return data;
        }),
  });
  const handleemployeeError = () => {
    toast("First, make salary !!!", {
      position: "top-center",
      autoClose: 1000,
    });
  };
  return (
    <div className="dashbord-shop-product-con">
      <h5 className="mb-4">Employee Salary</h5>
      <div className="staff-search-con">
        <Form
          // onSubmit={handlenamesearch}
          className="name-search"
        >
          <input
            className="name-input-staff"
            type="text"
            placeholder="Search by name"
            name="name"
          />
          <button type="submit">
            <BsSearch></BsSearch>
          </button>
        </Form>

        <Form
          // onSubmit={handleemailsearch}
          className="name-search"
        >
          <input
            className="name-input-staff"
            type="email"
            placeholder="Search by Email"
            name="email"
          />
          <button type="submit">
            <BsSearch></BsSearch>
          </button>
        </Form>

        {/* <input
          className="email-input-staff"
          onChange={handleemailsearch}
          type="email"
          placeholder="Search by Email"
        /> */}
        <select
          // onChange={handlerole}
          id="cars"
          placeholder="Category"
        >
          <option value="" disabled selected>
            Staff Role
          </option>
          <option value="admin">Admin</option>
          <option value="Driver">Driver</option>
          <option value="Manager">Manager</option>
        </select>
        <Link to="/dashbord/employee/salary/add" id="add-staff-btn">
          <IoMdAdd className="bulk-icon"></IoMdAdd> Add Salary
        </Link>
      </div>

      {loading ? (
        <>
          <Loading></Loading>
        </>
      ) : (
        <>
          {staffs?.length < 1 ? (
            <>
              <NotFound></NotFound>
            </>
          ) : (
            <div className="all-product-con">
              <div className="overflow-x-auto">
                <div className="overflow-x-auto">
                  <table className="table recent-order-table">
                    {/* <thead> */}
                    <tr className="recent-order-tr">
                      <th className="recent-order-hed">NAME</th>
                      <th className="recent-order-hed">EMAIL</th>
                      <th className="recent-order-hed">CONTACT</th>
                      <th className="recent-order-hed">JOINING DATE</th>
                      <th className="recent-order-hed">ROLE</th>
                      <th className="recent-order-hed">SALARY</th>
                      <th className="recent-order-hed">MAKE SALARY</th>
                      <th className="recent-order-hed">PAYSLIP</th>
                    </tr>
                    {/* </thead> */}
                    <tbody>
                      {staffs?.map((order) => (
                        <tr>
                          <td className="das-order-data">
                            <span className="staff-image-name">
                              <img src={order?.photo} alt="" />
                              <p>{order?.name}</p>
                            </span>
                          </td>
                          <td className="das-order-data">
                            <span>{order?.email}</span>{" "}
                          </td>
                          <td className="das-order-data">
                            <span>{order?.phone}</span>{" "}
                          </td>
                          <td className="das-order-data">
                            <span>{order?.join_date}</span>{" "}
                          </td>
                          <td className="das-order-data">
                            <span> {order?.role}</span>{" "}
                          </td>
                          <td className="das-order-data">
                            <span> {order?.salary}</span>
                          </td>
                          {/* to="/dashbord/employee/salary/add" */}
                          <td className="das-order-data">
                            {order &&
                            order?.paymentStatus &&
                            order?.paymentStatus
                              .split(" - ")[1]
                              ?.split(" ")[0] === currentMonth ? (
                              <span className="salary-add-done">Paid</span>
                            ) : (
                              <>
                                <Link
                                  className="make-admin-btn"
                                  id="make-salary-btn"
                                  to="/dashbord/employee/salary/add"
                                  state={order}
                                >
                                  Make Salary
                                </Link>
                              </>
                            )}
                          </td>
                          <td className="das-order-data">
                            {order &&
                            order?.paymentStatus &&
                            order?.paymentStatus
                              .split(" - ")[1]
                              ?.split(" ")[0] === currentMonth ? (
                              <>
                                {" "}
                                <Link
                                  to="/dashbord/employee/salary/invoice"
                                  state={order}
                                  className="make-admin-btn"
                                  id="make-slip-btn"
                                >
                                  Genarate Slip
                                </Link>
                              </>
                            ) : (
                              <>
                                <Link
                                  // to="/dashbord/employee/salary/invoice"
                                  // state={order}
                                  className="make-admin-btn"
                                  id="make-slip-btn"
                                  onClick={handleemployeeError}
                                >
                                  Genarate Slip
                                </Link>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="pagination-con">
                    {[...Array(page).keys()].map((number) => (
                      <button
                        key={number}
                        className={
                          currentpage === number && "selected-page-btn"
                        }
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
              </div>
            </div>
          )}
        </>
      )}

      <ToastContainer></ToastContainer>
    </div>
  );
};

export default DashbordEmployeeSalaryMake;
