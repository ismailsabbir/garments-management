import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { AuthContext } from "../../../Context/UserContext";
import { useState } from "react";
import Loading from "../../../CommonComponents/Loading/Loading";
import "./MyAddress.css";
import { Link, useLocation } from "react-router-dom";
const MyAddress = () => {
  const location = useLocation();
  const [shoporder, setorders] = useState([]);
  const [cartorder, setcartorder] = useState([]);
  const [customized, setcustomized] = useState([]);
  const [address, setaddres] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, userlogout } = useContext(AuthContext);
  const [showorder, setshoworder] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/address?email=${user?.email}`, {
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
        setaddres(jsonData);
        // setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch data:", error);
        setLoading(false);
      });
  }, [user?.email, userlogout]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/shoporder?email=${user?.email}`, {
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
        // setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch data:", error);
        setLoading(false);
      });
  }, [user?.email, userlogout]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/cart-s-order?email=${user?.email}`, {
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
        setcartorder(jsonData);
        // setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch data:", error);
        setLoading(false);
      });
  }, [user?.email, userlogout]);
  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_URL}/customize-s-order?email=${user?.email}`,
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
        setcustomized(jsonData);
        // setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch data:", error);
        setLoading(false);
      });
  }, [user?.email, userlogout]);
  useEffect(() => {
    if (location?.state) {
      setshoworder([location?.state]);
    } else if (address?.length >= 1) {
      setshoworder(address);
    } else if (cartorder?.length >= 1) {
      setshoworder(cartorder);
      setLoading(false);
    } else if (customized.length >= 1) {
      setshoworder(customized);
      setLoading(false);
    } else if (shoporder.length >= 1) {
      setshoworder(shoporder);
      setLoading(false);
    }
  }, [location.state, address, shoporder, cartorder, customized]);
  console.log(showorder);
  console.log(location.state);

  return (
    <div>
      <h5>Address Book</h5>
      <div className="my-address-con">
        {showorder.map((order) => (
          <div className="my-address">
            <div className="my-address-name-edit">
              <p>Name: {order?.name}</p>
              <Link
                to="/manage_account/address-edit"
                state={showorder}
                className="address-edit-link"
              >
                Edit
              </Link>
            </div>

            <p>Phone: {order?.phone}</p>
            <p>Email: {order?.email}</p>
            <p>
              Address:
              {order?.address}/{order?.postcode}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAddress;
