import React, { useContext, useState } from "react";
import { EmployeeContext } from "../../../Layouts/EmployeeLayouts/EmployeeLayouts";
import { useQuery } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import { Form } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import Loading from "../../../CommonComponents/Loading/Loading";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import "./DashbordLeaveManage.css";
const DashbordLeaveManage = () => {
  const employee = useContext(EmployeeContext);
  const [staffs, setstaffs] = useState([]);
  const [cuscurrentpage, setcuscurrentpage] = useState(0);
  const [datasize, setdatasize] = useState(5);
  const [cuscount, setcuscount] = useState(0);
  const custompage = Math.ceil(cuscount / datasize);
  const [searchvalue, setsearchvalue] = useState("");
  const [loading, setloading] = useState(true);
  console.log(staffs);
  const { data: products = [], refetch } = useQuery({
    queryKey: [
      "all_leave_requests",
      {
        page: cuscurrentpage,
        size: datasize,
      },
    ],
    queryFn: () =>
      fetch(
        `${process.env.REACT_APP_URL}/all_leave_requests?page=${cuscurrentpage}&&size=${datasize}&&email=${employee?.email}`,
        {
          headers: {
            authorization: `Beare ${localStorage.getItem("garments-token")}`,
          },
        }
      )
        .then((req) => req.json())
        .then((data) => {
          setstaffs(data.leaves);
          setcuscount(data?.count);
          setloading(false);
          return data;
        }),
  });

  const handleadmin = (id) => {
    fetch(`${process.env.REACT_APP_URL}/staff/admin/${id}`, {
      headers: {
        authorization: `Beare ${localStorage.getItem("garments-token")}`,
      },
      method: "PUT",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.message === "farbidden access") {
          toast("farbidden access !!!", {
            position: "top-center",
            autoClose: 1000,
          });
        }
        console.log(data);
        refetch();
      });
  };
  const handledelete = (staff) => {
    console.log(staff);
    fetch(`${process.env.REACT_APP_URL}/delete-request/${staff?._id}`, {
      headers: {
        authorization: `Beare ${localStorage.getItem("garments-token")}`,
      },
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        refetch();
      });
  };
  const handlenamesearch = (e) => {
    e.preventDefault();
    const search = e.target.name.value;
    setsearchvalue(search);
    fetch(
      `${process.env.REACT_APP_URL}/staff_name?search=${searchvalue}&&page=${cuscurrentpage}&&size=${datasize}`,
      {
        headers: {
          authorization: `Beare ${localStorage.getItem("garments-token")}`,
        },
      }
    )
      .then((req) => req.json())
      .then((data) => {
        console.log(data.result);
        setstaffs(data.result);
        setcuscount(data?.count);
        // setcuscount(0);
      });
  };
  const handleemailsearch = (e) => {
    e.preventDefault();
    const email = e.target.email.value;

    fetch(
      `${process.env.REACT_APP_URL}/single_staff?email=${email}&&page=${cuscurrentpage}&&size=${datasize}`,
      {
        headers: {
          authorization: `Beare ${localStorage.getItem("garments-token")}`,
        },
      }
    )
      .then((req) => req.json())
      .then((data) => {
        console.log(data.result);
        setstaffs(data.result);
        setcuscount(data?.count);
        // setcuscount(0);
      });
  };
  const handlerole = (e) => {
    const role = e.target.value;
    fetch(
      `${process.env.REACT_APP_URL}/single_staff_staff?staff=${role}&&page=${cuscurrentpage}&&size=${datasize}`,
      {
        headers: {
          authorization: `Beare ${localStorage.getItem("garments-token")}`,
        },
      }
    )
      .then((req) => req.json())
      .then((data) => {
        setstaffs(data.result);
        setcuscount(data?.count);
      });
  };
  return (
    <div className="dashbord-shop-product-con">
      <h5>My Leaves</h5>
      <div className="staff-search-con">
        <Form onSubmit={handlenamesearch} className="name-search">
          <input
            className="name-input-staff"
            type="text"
            placeholder="Search by Date"
            name="name"
          />
          <button type="submit">
            <BsSearch></BsSearch>
          </button>
        </Form>

        {/* <Form onSubmit={handleemailsearch} className="name-search">
            <input
              className="name-input-staff"
              type="email"
              placeholder="Search by Email"
              name="email"
            />
            <button type="submit">
              <BsSearch></BsSearch>
            </button>
          </Form> */}

        <select onChange={handlerole} id="cars" placeholder="Category">
          <option value="" disabled selected>
            Leave Status
          </option>
          <option value="admin">Admin</option>
          <option value="Driver">Driver</option>
          <option value="Manager">Manager</option>
        </select>
        <Link to="/employee/leaves/request" id="add-staff-btn">
          <IoMdAdd className="bulk-icon"></IoMdAdd>Add Leave Request
        </Link>
      </div>
      <div className="all-product-con">
        <div className="overflow-x-auto">
          <div className="overflow-x-auto">
            <table className="table recent-order-table">
              {/* <thead> */}
              <tr className="recent-order-tr">
                <th className="recent-order-hed">NAME</th>
                <th className="recent-order-hed">Apply Date</th>
                <th className="recent-order-hed">From Date</th>
                <th className="recent-order-hed">To Date</th>
                <th className="recent-order-hed">No Of Days</th>
                <th className="recent-order-hed">Half Day</th>
                <th className="recent-order-hed">Type</th>
                <th className="recent-order-hed">Status</th>
                <th className="recent-order-hed">Reason</th>
                <th className="recent-order-hed">Actions</th>
              </tr>
              {loading ? (
                <Loading></Loading>
              ) : (
                <tbody>
                  {staffs?.map((order) => (
                    <tr>
                      <td className="das-order-data">
                        <span className="staff-image-name">
                          <p>{order?.name}</p>
                        </span>
                      </td>

                      <td className="das-order-data">
                        <span>{order?.apply_date}</span>{" "}
                      </td>
                      <td className="das-order-data">
                        <span>{order?.from_date}</span>{" "}
                      </td>
                      <td className="das-order-data">
                        <span> {order?.to_date}</span>{" "}
                      </td>
                      <td className="das-order-data">
                        <span className="no-of-day">
                          {(new Date(order?.to_date) -
                            new Date(order?.from_date)) /
                            (1000 * 60 * 60 * 24)}
                        </span>
                      </td>
                      <td className="das-order-data">
                        <span> {order?.half_day}</span>{" "}
                      </td>
                      <td className="das-order-data">
                        <span> {order?.leave_type}</span>{" "}
                      </td>
                      <td className="das-order-data">
                        <span
                          className={`leave_status ${
                            order?.leave_status === "Rejected" ? "rejected" : ""
                          }`}
                        >
                          {" "}
                          {order?.leave_status}
                        </span>{" "}
                      </td>
                      <td className="das-order-data">
                        <span> {order?.reason?.slice(0, 15)}....</span>{" "}
                      </td>
                      <td className="das-order-data">
                        <div className="print-serach">
                          <Link
                            to="/dashbord/employee/leaves/response"
                            state={order}
                          >
                            <FiEdit className="printlogo"></FiEdit>
                          </Link>

                          <RiDeleteBinLine
                            onClick={() => handledelete(order)}
                            className="printlogo"
                          ></RiDeleteBinLine>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>

            <div className="pagination-con">
              {[...Array(custompage).keys()].map((number) => (
                <button
                  key={number}
                  className={cuscurrentpage === number && "selected-page-btn"}
                  id="paginationbtn"
                  onClick={() => setcuscurrentpage(number)}
                >
                  {number}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default DashbordLeaveManage;
