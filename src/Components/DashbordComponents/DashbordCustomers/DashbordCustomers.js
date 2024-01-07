import React from "react";
import "./DashbordCustomers.css";
import { useState } from "react";
import { useEffect } from "react";
import { LuClipboardEdit, LuImport } from "react-icons/lu";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { BiPrinter } from "react-icons/bi";
import { FaSearchPlus } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { BsSearch } from "react-icons/bs";
import { Form } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import { FaUserTie } from "react-icons/fa6";
const DashbordCustomers = () => {
  const [products, setproducts] = useState([]);
  const [cuscurrentpage, setcuscurrentpage] = useState(0);
  const [datasize, setdatasize] = useState(10);
  const [cuscount, setcuscount] = useState(0);
  const custompage = Math.ceil(cuscount / datasize);
  const [searchvalue, setsearchvalue] = useState("");
  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_URL}/allusers`)
  //     .then((res) => res.json())
  //     .then((data) => setproducts(data));
  // }, []);
  const { data: productss = [], refetch } = useQuery({
    queryKey: [
      "staff",
      {
        search: searchvalue,
        page: cuscurrentpage,
        size: datasize,
      },
    ],
    queryFn: () =>
      fetch(
        `${process.env.REACT_APP_URL}/allusers?search=${searchvalue}&&page=${cuscurrentpage}&&size=${datasize}`,
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
  console.log(products);
  return (
    <div className="dashbord-shop-product-con">
      <h5>Our Staff</h5>
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
            Customer Role
          </option>
          <option value="premium">Premium</option>
          <option value="normal">Normal</option>
        </select>
        <Link to="/dashbord/customers/add-customer" id="add-staff-btn">
          <IoMdAdd className="bulk-icon"></IoMdAdd> Add customers
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
                      <button
                        // onClick={() => handleadmin(order?._id)}
                        className="make-admin-btn"
                      >
                        Make Premium
                      </button>
                    </td>
                    <td className="das-order-data">
                      <div className="print-serach">
                        <Link to="/dashbord/staff/edit-staff" state={order}>
                          <FiEdit className="printlogo"></FiEdit>
                        </Link>

                        <RiDeleteBinLine
                          // onClick={() => handledelete(order)}
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

export default DashbordCustomers;
