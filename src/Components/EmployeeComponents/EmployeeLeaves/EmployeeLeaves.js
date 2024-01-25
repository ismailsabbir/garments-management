import React, { useContext, useState } from "react";
import "./EmployeeLeaves.css";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Form } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { EmployeeContext } from "../../../Layouts/EmployeeLayouts/EmployeeLayouts";
import Loading from "../../../CommonComponents/Loading/Loading";
import "./EmployeeLeaves.css";
const EmployeeLeaves = () => {
  const employee = useContext(EmployeeContext);
  const [staffs, setstaffs] = useState([]);
  const [cuscurrentpage, setcuscurrentpage] = useState(0);
  const [datasize, setdatasize] = useState(5);
  const [cuscount, setcuscount] = useState(0);
  const custompage = Math.ceil(cuscount / datasize);
  const [searchvalue, setsearchvalue] = useState("");
  const [loading, setloading] = useState(true);
  console.log("Employee Leaves");
  const { data: products = [], refetch } = useQuery({
    queryKey: [
      "my_leave_requests",
      {
        page: cuscurrentpage,
        size: datasize,
      },
    ],
    queryFn: () =>
      fetch(
        `${process.env.REACT_APP_URL}/my_leave_requests?page=${cuscurrentpage}&&size=${datasize}&&email=${employee?.email}`,
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
  const handledelete = (staff) => {
    fetch(`${process.env.REACT_APP_URL}/delete-request/${staff?._id}`, {
      headers: {
        authorization: `Beare ${localStorage.getItem("garments-token")}`,
      },
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
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
        setstaffs(data.result);
        setcuscount(data?.count);
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
              <tr className="recent-order-tr">
                <th className="recent-order-hed">NAME</th>
                <th className="recent-order-hed">Apply Date</th>
                <th className="recent-order-hed">From Date</th>
                <th className="recent-order-hed">To Date</th>
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
                          <p className="check_in_mobile">{order?.name}</p>
                        </span>
                      </td>

                      <td className="das-order-data">
                        <span>
                          <p className="check_in_mobile">{order?.apply_date}</p>
                        </span>{" "}
                      </td>
                      <td className="das-order-data">
                        <span>
                          <p className="check_in_mobile">{order?.from_date}</p>
                        </span>{" "}
                      </td>
                      <td className="das-order-data">
                        <span>
                          {" "}
                          <p className="check_in_mobile">{order?.to_date}</p>
                        </span>{" "}
                      </td>
                      <td className="das-order-data">
                        <span> {order?.half_day}</span>{" "}
                      </td>
                      <td className="das-order-data">
                        <span>
                          {" "}
                          <p className="check_in_mobile">{order?.leave_type}</p>
                        </span>{" "}
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
                        <span>
                          {" "}
                          <p className="check_in_mobile">
                            {order?.reason?.slice(0, 15)}....
                          </p>
                        </span>{" "}
                      </td>
                      <td className="das-order-data">
                        <div className="print-serach">
                          <Link
                            to="/employee/leaves/request/edit"
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

export default EmployeeLeaves;
