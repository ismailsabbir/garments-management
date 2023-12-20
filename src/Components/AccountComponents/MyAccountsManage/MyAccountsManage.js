import React, { useEffect, useState } from "react";
import "./MyAccountsManage.css";
import { useContext } from "react";
import { AuthContext } from "../../../Context/UserContext";
import { TbTruckDelivery } from "react-icons/tb";
import MyordersComponents from "../../MyOrdersComponents/MyordersComponents";
import Loading from "./../../../CommonComponents/Loading/Loading";
import { Link } from "react-router-dom";
const MyAccountsManage = () => {
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
        setLoading(false);
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
      })
      .catch((error) => {
        console.error("Failed to fetch data:", error);
        setLoading(false);
      });
  }, [user?.email, userlogout]);

  useEffect(() => {
    if (address?.length >= 1) {
      setshoworder(address);
      setLoading(false);
    } else if (shoporder.length >= 1) {
      setshoworder(shoporder);
      setLoading(false);
    } else if (cartorder?.length >= 1) {
      setshoworder(cartorder);
      setLoading(false);
    } else if (customized.length >= 1) {
      setshoworder(customized);
      setLoading(false);
    }
  }, [shoporder, cartorder, customized, address]);

  console.log(shoporder, address, customized, cartorder, loading);
  console.log(user);

  return (
    <div className="manage-account-con">
      {loading ? (
        <Loading></Loading>
      ) : (
        <>
          <div className="manage-info-con mb-10">
            <h5 className="mb-8">Manage My Account</h5>
            <div className="row manage-info-row ">
              <div className="col col-12 col-lg-4 col-md-3 col-sm-12 manage-personal">
                <h6 className="manage-title">Personal Profile </h6>
                <img className="user-image-mange" src={user?.photoURL} alt="" />
                <div className="manage-user-name-email">
                  <>Name: {user?.displayName}</>
                  <br />
                  <>Email: {user?.email}</>
                  <Link to="/manage_account/personal_information">
                    <button>Edit Personal information</button>
                  </Link>
                </div>
              </div>
              <div className="col col-12 col-lg-4 col-md-3 col-sm-12 manage-personal">
                <h6 className="manage-title">Address Book </h6>
                {/* <BiWorld className="user-image-mange"></BiWorld> */}
                {showorder?.map((firstorder) => (
                  <div className="manage-user-name-email">
                    <h6> {firstorder?.name}</h6>
                    <>{firstorder?.address}</>/<>{firstorder?.postcode}</>
                    <br />
                    <p>Mob: {firstorder?.phone}</p>
                    <Link to="/manage_account/address-book">
                      <button>Edit delivery Address</button>
                    </Link>
                  </div>
                ))}
              </div>
              <div className="col col-12 col-lg-3 col-md-3 col-sm-12 manage-personal">
                <p className="default-title">DEFAULT BILLING ADDRESS</p>
                {showorder?.map((firstorder) => (
                  <div className="manage-user-name-email">
                    <TbTruckDelivery className="user-image-mange mb-3"></TbTruckDelivery>
                    <h6> {firstorder?.name}</h6>
                    <>{firstorder?.address}</>/<>{firstorder?.postcode}</>
                    <br />
                    <p>Mob: {firstorder?.phone}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <MyordersComponents></MyordersComponents>
        </>
      )}
    </div>
  );
};

export default MyAccountsManage;
