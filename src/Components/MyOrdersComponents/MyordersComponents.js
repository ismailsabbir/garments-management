import React from "react";
import "./MyOrdersComponent.css";
import { useContext } from "react";
import { AuthContext } from "../../Context/UserContext";
import { useState } from "react";
import { useEffect } from "react";
import Loading from "../../CommonComponents/Loading/Loading";
import { Form } from "react-bootstrap";
const MyordersComponents = () => {
  const { user, userlogout } = useContext(AuthContext);
  const [orders, setorders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentpage, setcurrentpage] = useState(0);
  const [datasize, setdatasize] = useState(5);
  const [count, setcount] = useState(0);
  const page = Math.ceil(count / datasize);
  console.log(datasize, count, page);
  useEffect(() => {
    // setTimeout(() => {
    fetch(
      `${process.env.REACT_APP_URL}/shoporders?email=${user?.email}&page=${currentpage}&size=${datasize}`,
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
    // }, 2000);
  }, [user?.email, userlogout, currentpage, datasize]);

  const handlesearch = (e) => {
    e.preventDefault();
    const search = e.target.search.value;
    console.log(search);
    fetch(
      `${process.env.REACT_APP_URL}/idodrders?email=${user?.email}&page=${currentpage}&size=${datasize}&search=${search}`,
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
  };
  console.log(orders);
  return (
    <div className="my-orders-continer">
      {loading ? (
        <Loading></Loading>
      ) : (
        <>
          <div className="order-quenty-con">
            <select
              onChange={(e) => setdatasize(e.target.value)}
              className="select1 select-bordered "
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
            <Form onSubmit={handlesearch} className="search-con">
              <input name="search" placeholder="Search by order id" />
              <button type="submit">Search</button>
            </Form>
          </div>
          {orders?.map((order) => (
            <div className="shop-order-manage">
              <div className="shop-order-manage-title">
                <div>
                  <h6>Order {order?.orderid}</h6>
                  <h6>Placed on {order?.order_date}</h6>
                </div>
                <button>Manage</button>
              </div>
              <div className="shop-order-product-manage">
                <img src={order?.dress_photo} alt="" />
                <h6>{order?.category_name}</h6>

                <h6>QTY:{order?.pices}</h6>
                <p>{order?.order}</p>
                <p>{order?.delivery_status}</p>
                <p>{order?.dliveryDate}</p>
              </div>
            </div>
          ))}
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
        </>
      )}
    </div>
  );
};

export default MyordersComponents;
