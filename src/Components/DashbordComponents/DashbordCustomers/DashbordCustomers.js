import React from "react";
import "./DashbordCustomers.css";
import { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { BsSearch } from "react-icons/bs";
import { Form } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import { FaUserTie } from "react-icons/fa6";
import Swal from "sweetalert2";
import NotFound from "../../../CommonComponents/NotFound/NotFound";
const DashbordCustomers = () => {
  const [products, setproducts] = useState([]);
  const [cuscurrentpage, setcuscurrentpage] = useState(0);
  const [datasize, setdatasize] = useState(10);
  const [cuscount, setcuscount] = useState(0);
  const custompage = Math.ceil(cuscount / datasize);
  const [searchname, setsearchname] = useState("");
  const [searchemail, setsearchemail] = useState("");
  const [searchrole, setsearchrole] = useState("");
  const [reset, setreset] = useState(false);
  console.log("Dashbord Customers");
  const { data: productss = [], refetch } = useQuery({
    queryKey: [
      "allusers",
      {
        searchname: searchname,
        searchemail: searchemail,

        searchrole: searchrole,
        reset: reset,
        page: cuscurrentpage,
        size: datasize,
      },
    ],
    queryFn: () =>
      fetch(
        `${process.env.REACT_APP_URL}/allusers?searchname=${searchname}&&reset=${reset}&&searchrole=${searchrole}&&searchemail=${searchemail}&&page=${cuscurrentpage}&&size=${datasize}`,
        {
          headers: {
            authorization: `Beare ${localStorage.getItem("garments-token")}`,
          },
        }
      )
        .then((req) => req.json())
        .then((data) => {
          setproducts(data.result);
          setcuscount(data?.count);
          return data;
        }),
  });
  const handledelete = (staff) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delate the customer!!",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "DELATE",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${process.env.REACT_APP_URL}/delete-customers/${staff?._id}`, {
          headers: {
            authorization: `Beare ${localStorage.getItem("garments-token")}`,
          },
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            toast("Customer Delate Sucessfully !!!", {
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
    const name = e.target.name.value;
    setsearchemail("");
    setsearchrole("");
    setsearchname(name);
  };
  const handleemailsearch = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    setsearchname("");
    setsearchrole("");
    setsearchemail(email);
  };
  const handlerole = (e) => {
    setsearchemail("");
    setsearchname("");
    setsearchrole(e);
  };
  const handlereset = () => {
    setsearchemail("");
    setsearchname("");
    setsearchrole("");
    setreset(true);
  };
  const handlepremium = (order, status) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to make a ${status} customer!`,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Make ${status}`,
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `${process.env.REACT_APP_URL}/customer/premium/${order?._id}/${status}`,
          {
            headers: {
              authorization: `Beare ${localStorage.getItem("garments-token")}`,
            },
            method: "PUT",
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data?.message === "farbidden access") {
              toast("farbidden access !!!", {
                position: "top-center",
                autoClose: 1000,
              });
            } else {
              toast(`Make ${status} Customer sucessfully !!!`, {
                position: "top-center",
                autoClose: 1000,
              });
            }
            refetch();
          });
      }
    });
  };
  return (
    <div className="dashbord-shop-product-con">
      <div className="dashbord_customer_hed">
        <h5>Our Customers</h5>
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
        <select
          onChange={(e) => handlerole(e.target.value)}
          id="cars"
          placeholder="Category"
        >
          <option value="" disabled selected>
            Customer Role
          </option>
          <option value="Premium">Premium</option>
          <option value="normal">Normal</option>
        </select>
        <Link to="/dashbord/customers/add-customer" id="add-staff-btn">
          <IoMdAdd className="bulk-icon"></IoMdAdd> Add customers
        </Link>
      </div>
      <div className="all-product-con">
        <div className="overflow-x-auto">
          <div className="overflow-x-auto">
            {products?.length > 1 ? (
              <table className="table recent-order-table">
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

                <tbody>
                  {products?.map((order) => (
                    <tr>
                      <td className="das-order-data">
                        <span className="staff-image-name">
                          {order?.photo ? (
                            <img src={order?.photo} alt="" />
                          ) : (
                            <p className="fauser-con">
                              <FaUserTie className="fauser" />
                            </p>
                          )}
                          {order?.name ? <p>{order?.name}</p> : <p>XX:YYY</p>}
                        </span>
                      </td>
                      <td className="das-order-data">
                        <span>{order?.email}</span>{" "}
                      </td>
                      <td className="das-order-data">
                        {order?.phone ? (
                          <span>{order?.phone}</span>
                        ) : (
                          <span>0100000000</span>
                        )}
                      </td>
                      <td className="das-order-data">
                        {order?.join_date ? (
                          <span>{order?.join_date}</span>
                        ) : (
                          <span>00/00/00</span>
                        )}
                      </td>
                      <td className="das-order-data">
                        {order?.role ? (
                          <span> {order?.role}</span>
                        ) : (
                          <span> Normal</span>
                        )}
                      </td>
                      <td className="das-order-data">
                        <button className="active-staff">Active</button>
                      </td>
                      <td className="das-order-data">
                        {order?.role === "Premium" ? (
                          <button
                            onClick={() => handlepremium(order, "Normal")}
                            className="make-admin-btn"
                            id="make-normal-btn"
                          >
                            Make Normal
                          </button>
                        ) : (
                          <button
                            onClick={() => handlepremium(order, "Premium")}
                            className="make-admin-btn"
                          >
                            Make Premium
                          </button>
                        )}
                      </td>
                      <td className="das-order-data">
                        <div className="print-serach">
                          <Link to="/dashbord/customers/edit" state={order}>
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
            ) : (
              <NotFound></NotFound>
            )}

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

export default DashbordCustomers;
