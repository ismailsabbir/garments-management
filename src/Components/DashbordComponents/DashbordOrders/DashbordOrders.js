import React, { useContext, useEffect, useState } from "react";
import "./DashbordOrders.css";
import { AuthContext } from "../../../Context/UserContext";
import { BiPrinter } from "react-icons/bi";
import { FaSearchPlus } from "react-icons/fa";
import "./DashbordOrders.css";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import { Form } from "react-bootstrap";
import Loading from "../../../CommonComponents/Loading/Loading";
import NotFound from "../../../CommonComponents/NotFound/NotFound";
const DashbordOrders = () => {
  const [orders, setorders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, userlogout } = useContext(AuthContext);
  const email = user?.email;
  const [currentpage, setcurrentpage] = useState(0);
  const [datasize, setdatasize] = useState(5);
  const [count, setcount] = useState(0);
  const page = Math.ceil(count / datasize);
  const [search, setsearch] = useState("");
  const [reset, setreset] = useState(false);
  const [orderDate, setorderDate] = useState();
  // &category=${category}&status=${status}
  const { data: productall = [], refetch } = useQuery({
    queryKey: [
      "allshoporders",
      {
        orderDate: orderDate,
        search: search,
        page: currentpage,
        size: datasize,
        reset: reset,
        // status: status,
      },
    ],
    queryFn: () =>
      fetch(
        `${process.env.REACT_APP_URL}/allshoporders?email=${user?.email}&page=${currentpage}&size=${datasize}&search=${search}&reset=${reset}&orderDate=${orderDate}`,
        {
          headers: {
            authorization: `Beare ${localStorage.getItem("garments-token")}`,
          },
        }
      )
        .then((res) => {
          if (res.status === 401 || res.status === 403) {
            return userlogout();
          }
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setorders(data?.product);
          setcount(data?.count);
          setLoading(false);
          return data;
        })
        .catch((error) => {
          console.error("Failed to fetch data:", error);
          setLoading(false);
        }),
  });
  const handlereset = () => {
    setorderDate();
    setsearch(false);
    setreset(true);
  };
  const handlecategory = (e) => {
    const orderDate = e.target.value;
    console.log(orderDate);
    setreset(false);
    setorderDate();
    setorderDate(orderDate);
  };
  const handlecustomersearch = (event) => {
    event.preventDefault();
    const customerName = event.target.name.value;
    setreset(false);
    setorderDate();
    setsearch(customerName);
    console.log(customerName);
  };
  return (
    <div>
      <div className="das-recent-order-con">
        <h5>All Order</h5>
        <div className="order-search-con">
          <Form
            onSubmit={handlecustomersearch}
            className="order-status-limit mb-6"
          >
            <input
              type="text"
              name="name"
              placeholder="Search order by Customer name"
            />
            <select id="cars" placeholder="Category">
              <option value="" disabled selected>
                Status
              </option>
              <option value="saab">Shari</option>
              <option value="vw">T-shirt</option>
              <option value="audi">Panjabi</option>
            </select>
            <select id="cars" onChange={handlecategory}>
              <option value="" disabled selected>
                Order Limit
              </option>
              <option value="1">Last 1 days orders</option>
              <option value="2">Last 2 days orders</option>
              <option value="7">Last 7 days orders</option>
              <option value="15">Last 15 days orders</option>
              <option value="30">Last 30 days orders</option>
            </select>
          </Form>
          <div className="order-status-limit">
            <input
              className="date-chose"
              type="date"
              placeholder="Search Product"
            />
            <input
              className="date-chose"
              type="date"
              placeholder="Search Product"
            />
            <button
              onClick={handlereset}
              className="product-reset"
              id="order-reset-btn"
            >
              ReSet
            </button>
            <button className="download-order-btn">
              <AiOutlineCloudDownload className="download-btn"></AiOutlineCloudDownload>
              Download All Orders
            </button>
          </div>
        </div>
        {loading ? (
          <>
            <Loading></Loading>
          </>
        ) : (
          <>
            {orders?.length < 1 ? (
              <>
                <NotFound></NotFound>
              </>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <div className="overflow-x-auto">
                    <table className="table recent-order-table">
                      <tr className="recent-order-tr">
                        <th className="recent-order-hed">INVOICE NO</th>
                        <th className="recent-order-hed">ORDER TIME</th>
                        <th className="recent-order-hed">CUSTOMER NAME</th>
                        <th className="recent-order-hed">METHOD</th>
                        <th className="recent-order-hed">AMOUNT</th>
                        <th className="recent-order-hed">STATUS</th>
                        <th className="recent-order-hed">ACTION</th>
                        <th className="recent-order-hed">INVOICE</th>
                      </tr>
                      <tbody>
                        {orders?.map((order) => (
                          <tr>
                            <td className="das-order-data">
                              <span>{order?.orderid}</span>{" "}
                            </td>
                            <td className="das-order-data">
                              <span>{order?.order_date}</span>{" "}
                            </td>
                            <td className="das-order-data">
                              <span>{order?.name}</span>{" "}
                            </td>
                            <td className="das-order-data">
                              <span>Online</span>{" "}
                            </td>
                            <td className="das-order-data">
                              <span>Tk: {order?.total_price}</span>{" "}
                            </td>
                            <td className="das-order-data">
                              <span>{order?.order}</span>
                            </td>
                            <td className="das-order-data">
                              <select className="status-select">
                                <option value="">Delivered</option>
                                <option value="">Pending</option>
                                <option value="">Processing</option>
                                <option value="cancel">Cancel</option>
                              </select>
                            </td>
                            <td className="das-order-data">
                              <div className="print-serach">
                                <BiPrinter className="printlogo"></BiPrinter>
                                <FaSearchPlus className="printlogo"></FaSearchPlus>
                              </div>
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
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DashbordOrders;
