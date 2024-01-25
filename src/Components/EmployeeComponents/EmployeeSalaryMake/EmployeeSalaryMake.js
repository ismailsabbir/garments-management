import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import Loading from "../../../CommonComponents/Loading/Loading";
import NotFound from "../../../CommonComponents/NotFound/NotFound";
import { Link } from "react-router-dom";
import "./EmployeeSalaryMake.css";
const EmployeeSalaryMake = () => {
  const [staffs, setstaffs] = useState([]);
  const [loading, setloading] = useState(true);
  const [currentpage, setcurrentpage] = useState(0);
  const [datasize, setdatasize] = useState(10);
  const [count, setcount] = useState(0);
  const page = Math.ceil(count / datasize);
  const [searchname, setsearchname] = useState("");
  const [searchemail, setsearchemail] = useState("");
  const [role, setrole] = useState("");
  const [reset, setreset] = useState(false);
  console.log("Employee Salary Make");
  const currentMonth = new Date().toLocaleString("en-us", {
    month: "long",
  });
  const { data: products = [], refetch } = useQuery({
    queryKey: [
      "staff_information",
      {
        page: currentpage,
        size: datasize,
        searchname: searchname,
        searchemail: searchemail,
        role: role,
        reset: reset,
      },
    ],
    queryFn: () =>
      fetch(
        `${process.env.REACT_APP_URL}/staff_information?search=${searchname}&&page=${currentpage}&&size=${datasize}&searchemail=${searchemail}&role=${role}&reset=${reset}`,
        {
          headers: {
            authorization: `Beare ${localStorage.getItem("garments-token")}`,
          },
        }
      )
        .then((req) => req.json())
        .then((data) => {
          setstaffs(data?.result);
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

  const handlenamesearch = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    setrole("");
    setsearchemail("");
    setsearchname(name);
  };
  const handleemailsearch = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    setsearchname("");
    setrole("");
    setsearchemail(email);
  };
  const handlerole = (e) => {
    setsearchname("");
    setsearchemail("");
    setrole(e);
  };
  const handlereset = () => {
    setsearchname("");
    setsearchemail("");
    setrole("");
    setreset(true);
  };

  return (
    <div className="dashbord-shop-product-con">
      <div className="salary_make_hed">
        <h5 className="mb-4">Employee Salary</h5>
      </div>

      <div className="staff-search-con">
        <Form onSubmit={handlenamesearch} className="name-search">
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

        <Form onSubmit={handleemailsearch} className="name-search">
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
        <select
          onChange={(e) => handlerole(e.target.value)}
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

        <button
          onClick={handlereset}
          className="product-reset"
          id="order-reset-btn"
        >
          ReSet
        </button>
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

                    <tbody>
                      {staffs?.map((order) => (
                        <tr>
                          <td className="das-order-data">
                            <span className="staff-image-name">
                              <img src={order?.photo} alt="" />
                              <p className="employee_name_mobile">
                                {order?.name}
                              </p>
                            </span>
                          </td>
                          <td className="das-order-data">
                            <span>{order?.email}</span>{" "}
                          </td>
                          <td className="das-order-data">
                            <span>{order?.phone}</span>{" "}
                          </td>
                          <td className="das-order-data">
                            <span>
                              <p className="employee_join_date">
                                {order?.join_date}
                              </p>
                            </span>{" "}
                          </td>
                          <td className="das-order-data">
                            <span> {order?.role}</span>{" "}
                          </td>
                          <td className="das-order-data">
                            <span> {order?.salary}</span>
                          </td>
                          <td className="das-order-data">
                            {order &&
                            order?.paymentStatus &&
                            order?.paymentStatus
                              .split(" - ")[1]
                              ?.split(" ")[0] === currentMonth ? (
                              <span className="salary-add-done">Paid</span>
                            ) : (
                              <div>
                                <Link
                                  className="make-admin-btn"
                                  id="make-salary-btn"
                                  to="/dashbord/employee/salary/add"
                                  state={order}
                                >
                                  Make Salary
                                </Link>
                              </div>
                            )}
                          </td>
                          <td className="das-order-data">
                            {order &&
                            order?.paymentStatus &&
                            order?.paymentStatus
                              .split(" - ")[1]
                              ?.split(" ")[0] === currentMonth ? (
                              <div className="slip_mobile">
                                {" "}
                                <Link
                                  to="/dashbord/employee/salary/invoice"
                                  state={order}
                                  className="make-admin-btn"
                                  id="make-slip-btn"
                                >
                                  Genarate Slip
                                </Link>
                              </div>
                            ) : (
                              <>
                                <Link
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

export default EmployeeSalaryMake;
