import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";

const EmployeeStaff = () => {
  const [staffs, setstaffs] = useState([]);
  const [cuscurrentpage, setcuscurrentpage] = useState(0);
  const [datasize, setdatasize] = useState(5);
  const [cuscount, setcuscount] = useState(0);
  const custompage = Math.ceil(cuscount / datasize);
  const [searchvalue, setsearchvalue] = useState("");
  const [staff, setstaff] = useState("");
  const { data: products = [], refetch } = useQuery({
    queryKey: [
      "single_employee_staff",
      {
        search: searchvalue,
        page: cuscurrentpage,
        size: datasize,
      },
    ],
    queryFn: () =>
      fetch(
        `${process.env.REACT_APP_URL}/single_employee_staff?search=${searchvalue}&&page=${cuscurrentpage}&&size=${datasize}`,
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
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delate the staff!",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "DELATE",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${process.env.REACT_APP_URL}/delete-staff/${staff?._id}`, {
          headers: {
            authorization: `Beare ${localStorage.getItem("garments-token")}`,
          },
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            toast("Staff Delate Sucessfully !!!", {
              position: "top-center",
              autoClose: 1000,
            });
            refetch();
          });
      }
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
  const handlereset = () => {
    fetch(
      `${process.env.REACT_APP_URL}/staff_name?page=${cuscurrentpage}&&size=${datasize}`,
      {
        headers: {
          authorization: `Beare ${localStorage.getItem("garments-token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setstaffs(data.result);
        setcuscount(data?.count);
      });
  };
  return (
    <div className="dashbord-shop-product-con">
      <div className="dashbord_customer_hed">
        <h5>Our Staffs</h5>
        <button onClick={handlereset}>Reset</button>
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
        <select onChange={handlerole} id="cars" placeholder="Category">
          <option value="" disabled selected>
            Staff Role
          </option>
          <option value="admin">Admin</option>
          <option value="Driver">Driver</option>
          <option value="Manager">Manager</option>
        </select>
        <Link to="/dashbord/staff/add-staff" id="add-staff-btn">
          <IoMdAdd className="bulk-icon"></IoMdAdd> Add Staff
        </Link>
      </div>
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
                <th className="recent-order-hed">STATUS</th>
                <th className="recent-order-hed">PUBLISHED</th>
                <th className="recent-order-hed">ACTION</th>
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
                      <button className="active-staff">Active</button>
                    </td>
                    <td className="das-order-data">
                      <button
                        onClick={() => handleadmin(order?._id)}
                        className="make-admin-btn"
                      >
                        Make Admin
                      </button>
                    </td>
                    <td className="das-order-data">
                      <div className="print-serach">
                        <Link to="/dashbord/staff/edit-staff" state={order}>
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

export default EmployeeStaff;
