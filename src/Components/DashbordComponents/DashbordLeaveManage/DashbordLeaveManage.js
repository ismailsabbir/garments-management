import React, { useState } from "react";
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
import Swal from "sweetalert2";
const DashbordLeaveManage = () => {
  const [staffs, setstaffs] = useState([]);
  const [cuscurrentpage, setcuscurrentpage] = useState(0);
  const [datasize, setdatasize] = useState(5);
  const [cuscount, setcuscount] = useState(0);
  const custompage = Math.ceil(cuscount / datasize);
  const [searchvalue, setsearchvalue] = useState("");
  const [datesearch, setdatesearch] = useState("");
  const [rolesearch, setrolesearch] = useState("");
  const [reset, setreset] = useState(false);
  const [loading, setloading] = useState(true);
  console.log("Dashbord Leave Manage");
  const { data: products = [], refetch } = useQuery({
    queryKey: [
      "all_leave_requests",
      {
        page: cuscurrentpage,
        size: datasize,
        searchvalue: searchvalue,
        datesearch: datesearch,
        rolesearch: rolesearch,
        reset: reset,
      },
    ],
    queryFn: () =>
      fetch(
        `${process.env.REACT_APP_URL}/all_leave_requests?page=${cuscurrentpage}&&size=${datasize}&&searchvalue=${searchvalue}&&datesearch=${datesearch}&&rolesearch=${rolesearch}&&reset=${reset}`,
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
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to delate this!",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "DELATE",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${process.env.REACT_APP_URL}/delete-request/${staff?._id}`, {
          headers: {
            authorization: `Beare ${localStorage.getItem("garments-token")}`,
          },
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            refetch();
            toast("Delate sucessfully !!!", {
              position: "top-center",
              autoClose: 1000,
            });
          });
      }
    });
  };

  const handlenamesearch = (e) => {
    e.preventDefault();
    const search = e.target.name.value;
    setdatesearch("");
    setrolesearch("");
    setsearchvalue(search);
  };
  const handledatesearch = (e) => {
    e.preventDefault();
    const data = e.target.date.value;
    setrolesearch("");
    setsearchvalue("");
    setdatesearch(data);
  };
  const handlerole = (e) => {
    const role = e.target.value;
    setsearchvalue("");
    setdatesearch("");
    setrolesearch(role);
  };
  const handlereset = () => {
    setsearchvalue("");
    setdatesearch("");
    setrolesearch("");
    setreset(true);
  };
  return (
    <div className="dashbord-shop-product-con">
      <div className="leave_manage_hed">
        <h5>All Leaves</h5>
        <button
          onClick={handlereset}
          className="product-reset"
          id="order-reset-btn"
        >
          ReSet
        </button>
      </div>
      <div className="staff-search-con">
        <Form onSubmit={handledatesearch} className="name-search">
          <input
            className="name-input-staff"
            type="date"
            placeholder="Search by Date"
            name="date"
          />
          <button type="submit">
            <BsSearch></BsSearch>
          </button>
        </Form>
        <Form onSubmit={handlenamesearch} className="name-search">
          <input
            className="name-input-staff"
            type="text"
            placeholder="Search by Name"
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
          <option value="Pending">Pending</option>
          <option value="Rejected">Rejected</option>
          <option value="Approved">Approved</option>
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
                          <p className="join_mobile">{order?.name}</p>
                        </span>
                      </td>

                      <td className="das-order-data">
                        <span>
                          <p className="join_mobile">{order?.apply_date}</p>
                        </span>{" "}
                      </td>
                      <td className="das-order-data">
                        <span>
                          <p className="join_mobile">{order?.from_date}</p>
                        </span>{" "}
                      </td>
                      <td className="das-order-data">
                        <span>
                          <p className="join_mobile"> {order?.to_date}</p>
                        </span>{" "}
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
                        <span>
                          {" "}
                          <p className="join_mobile">{order?.leave_type}</p>
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
                          <p className="join_mobile">
                            {order?.reason?.slice(0, 15)}....
                          </p>
                        </span>{" "}
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
