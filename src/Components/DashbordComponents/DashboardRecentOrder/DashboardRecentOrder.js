import React, { useContext, useEffect, useState } from "react";
import { BiPrinter, IconName } from "react-icons/bi";
import { FaSearchPlus } from "react-icons/fa";
import "./DashboardRecentOrder.css";
import { AuthContext } from "../../../Context/UserContext";
const DashboardRecentOrder = () => {
  const [orders, setorders] = useState([]);
  const [customizesorders, setcustomizedorders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, userlogout } = useContext(AuthContext);
  const email = user?.email;
  const [currentpage, setcurrentpage] = useState(0);
  const [cuscurrentpage, setcuscurrentpage] = useState(0);
  const [datasize, setdatasize] = useState(5);
  const [count, setcount] = useState(0);
  const [cuscount, setcuscount] = useState(0);
  const page = Math.ceil(count / datasize);
  const custompage = Math.ceil(cuscount / datasize);
  console.log(datasize, count, page);
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
  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_URL}/allcustomizedorders?email=${user?.email}&page=${cuscurrentpage}&size=${datasize}`,
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
        setcustomizedorders(jsonData.product);
        setcuscount(jsonData.count);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch data:", error);
        setLoading(false);
      });
  }, [user?.email, userlogout, cuscurrentpage, datasize]);
  console.log(customizesorders);
  return (
    <div>
      <div className="das-recent-order-con">
        <h5>Recent Order</h5>
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

      <div className="das-recent-order-con">
        <h5>Recent Customized Order</h5>
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
                {customizesorders?.map((order) => (
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
    </div>
  );
};

export default DashboardRecentOrder;
