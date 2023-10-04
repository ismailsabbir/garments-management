import React from "react";
import "./MyCustomizedOrders.css";
import { AuthContext } from "../../Context/UserContext";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
const MyCustomizedOrders = () => {
  const { user, userlogout } = useContext(AuthContext);
  const [orders, setorders] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      fetch(
        `${process.env.REACT_APP_URL}/customized_orders?email=${user?.email}`,
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
          setorders(jsonData);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch data:", error);
          setLoading(false);
        });
    }, 2000);
  }, [user?.email, userlogout]);

  console.log(orders);
  return (
    <div>
      <h1>Customized orders</h1>
    </div>
  );
};

export default MyCustomizedOrders;
