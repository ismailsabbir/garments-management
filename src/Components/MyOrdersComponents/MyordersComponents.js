import React from "react";
import "./MyOrdersComponent.css";
import { useContext } from "react";
import { AuthContext } from "../../Context/UserContext";
import { useState } from "react";
import { useEffect } from "react";
import Loading from "../../CommonComponents/Loading/Loading";
const MyordersComponents = () => {
  const { user, userlogout } = useContext(AuthContext);
  const [orders, setorders] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      fetch(`${process.env.REACT_APP_URL}/shoporders?email=${user?.email}`, {
        headers: {
          authorization: `Beare ${localStorage.getItem("garments-token")}`,
        },
      })
        .then((res) => {
          if (res.status === 401 || res.status === 403) {
            return userlogout();
          }
          return res.json();
        })
        .then((jsonData) => {
          setorders(jsonData);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch data:", error);
          setLoading(false);
        });
    }, 2000);
  }, [user?.email, userlogout]);

  const handleSelectChange = (event) => {
    const newValue = event.target.value;
    if (parseInt(newValue) === 5) {
      const neworder = orders?.slice(orders.length - 5, orders.length);
      setorders(neworder);
    }
  };

  return (
    <div className="my-orders-continer">
      {loading ? (
        <Loading></Loading>
      ) : (
        <>
          <div className="order-quenty-con">
            <select
              onChange={handleSelectChange}
              className="select1 select-bordered "
            >
              <option value={0}>Al orders</option>
              <option value={5} selected>
                Last 5 orders
              </option>
              <option value={15}>Last 15 days orders</option>
              <option value={30}>Last 30 days orders</option>
              <option value={1}>Last year orders</option>
            </select>
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
        </>
      )}
    </div>
  );
};

export default MyordersComponents;
