import React, { useContext, useEffect, useState } from "react";
import "./DashbordOrders.css";
import { AuthContext } from "../../../Context/UserContext";
import { BiPrinter } from "react-icons/bi";
import { FaSearchPlus } from "react-icons/fa";
import "./DashbordOrders.css";
import { AiOutlineCloudDownload } from "react-icons/ai";
const DashbordOrders = () => {
  const [orders, setorders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, userlogout } = useContext(AuthContext);
  const email = user?.email;
  const [currentpage, setcurrentpage] = useState(0);
  const [datasize, setdatasize] = useState(5);
  const [count, setcount] = useState(0);
  const page = Math.ceil(count / datasize);

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_URL}/allshoporders?email=${user?.email}&page=${currentpage}&size=${datasize}`,
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
      .then((jsonData) => {
        setorders(jsonData.product);
        setcount(jsonData.count);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch data:", error);
        setLoading(false);
      });
  }, [user?.email, userlogout, currentpage, datasize]);

  return (
    <div>
      <div className="das-recent-order-con">
        <h5>All Order</h5>
        <div className="order-search-con">
          <div className="order-status-limit mb-6">
            <input type="text" placeholder="Search order by Customer name" />
            <select id="cars" placeholder="Category">
              <option value="" disabled selected>
                Status
              </option>
              <option value="saab">Shari</option>
              <option value="vw">T-shirt</option>
              <option value="audi">Panjabi</option>
            </select>
            <select id="cars">
              <option value="" disabled selected>
                Order Limit
              </option>
              <option value="saab">Low To High</option>
              <option value="vw">Processing</option>
              <option value="audi">Audi</option>
            </select>
          </div>
          <div className="order-status-limit">
            <input type="date" placeholder="Search Product" />
            <input type="date" placeholder="Search Product" />
            <button className="download-order-btn">
              <AiOutlineCloudDownload className="download-btn"></AiOutlineCloudDownload>
              Download All Orders
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="overflow-x-auto">
            <table className="table recent-order-table">
              {/* <thead> */}
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
              {/* </thead> */}
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
                  className={currentpage === number && "selected-page-btn"}
                  id="paginationbtn"
                  onClick={() => setcurrentpage(number)}
                >
                  {number}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashbordOrders;
