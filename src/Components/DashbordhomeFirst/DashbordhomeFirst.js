import React, { useEffect, useState } from "react";
import { SiPowerpages } from "react-icons/si";
import { BsCart, BsCartCheck, BsJournalBookmark } from "react-icons/bs";
import { FaRotate } from "react-icons/fa6";
import { GrDeliver } from "react-icons/gr";
import { TiTick } from "react-icons/ti";
import DashbordChirts from "../DashbordComponents/DashbordChirts/DashbordChirts";
const DashbordhomeFirst = () => {
  const [todayshoporders, settodayshoporders] = useState([]);
  const [todayCustomizedorders, settodayCustomizedorders] = useState([]);
  const [todayshopordersPrice, settodayshopordersprice] = useState("");
  const [todayCustomizedordersPrice, settodayCustomizedordersPrice] =
    useState("");

  const [monthshoporders, setmonthshoporders] = useState([]);
  const [monthCustomizedorders, setmonthCustomizedorders] = useState([]);
  const [monthshopordersPrice, setmonthshopordersprice] = useState("");
  const [monthCustomizedordersPrice, setmonthCustomizedordersPrice] =
    useState("");
  const [yearhshoporders, setyearshoporders] = useState([]);
  const [yearhCustomizedorders, setyearCustomizedorders] = useState([]);
  const [yearhshopordersPrice, setyearshopordersprice] = useState("");
  const [yearhCustomizedordersPrice, setyearCustomizedordersPrice] =
    useState("");
  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/today-orders`)
      .then((res) => res.json())
      .then((data) => {
        console.log("todaydata", data);
        settodayshoporders(data?.todayOrders);
        settodayCustomizedorders(data?.todycustomorders);
        settodayshopordersprice(data?.totalPrice);
        settodayCustomizedordersPrice(data?.totla_customized_price);
      });
  }, []);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/currentMonthOrders`)
      .then((res) => res.json())
      .then((data) => {
        setmonthshoporders(data?.orders);
        setmonthCustomizedorders(data?.customizedorders);
        setmonthshopordersprice(data?.totalPrice);
        setmonthCustomizedordersPrice(data?.customizedPrice);
      });
  }, []);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/currentYearOrders`)
      .then((res) => res.json())
      .then((data) => {
        setyearshoporders(data?.orders);
        setyearCustomizedorders(data?.customizedorders);
        setyearshopordersprice(data?.totalPrice);
        setyearCustomizedordersPrice(data?.customizedprice);
      });
  }, []);
  console.log(
    "Today",
    todayshoporders,
    todayCustomizedorders,
    todayshopordersPrice,
    todayCustomizedordersPrice
  );
  console.log(
    "month",
    monthshoporders,
    monthCustomizedorders,
    monthshopordersPrice,
    monthCustomizedordersPrice
  );
  console.log(
    yearhshoporders,
    yearhCustomizedorders,
    yearhshopordersPrice,
    yearhCustomizedordersPrice
  );
  return (
    <div className="dashbord-home-first-con">
      <div className=" dashbord-home-first-hole">
        <div className=" dashbord-first-card">
          <SiPowerpages className="payment-logo"></SiPowerpages>
          <h6 className="payment-tit-das">Today Orders</h6>
          <h4 className="payment-tk">Tk:561.07</h4>
          <div className="dashbord-payment-typ">
            <div>
              <h6>Cash:</h6>
              <p>Tk:764</p>
            </div>
            <div>
              <h6>Card:</h6>
              <p>Tk:5454</p>
            </div>
            <div>
              <h6>Bkash:</h6>
              <p>Tk:454</p>
            </div>
          </div>
        </div>
        <div className=" dashbord-first-card" id="mid-card-dash">
          <SiPowerpages className="payment-logo"></SiPowerpages>
          <h6 className="payment-tit-das">Yesterday Orders</h6>
          <h4 className="payment-tk">Tk:561.07</h4>
          <div className="dashbord-payment-typ">
            <div>
              <h6>Cash:</h6>
              <p>Tk:764</p>
            </div>
            <div>
              <h6>Card:</h6>
              <p>Tk:5454</p>
            </div>
            <div>
              <h6>Bkash:</h6>
              <p>Tk:454</p>
            </div>
          </div>
        </div>
        <div className=" dashbord-first-card" id="mid1-card-dash">
          <BsCartCheck className="payment-logo"></BsCartCheck>
          <h6 className="payment-tit-das">This Month</h6>
          <h4 className="payment-tk">Tk:561.07</h4>
        </div>
        <div className=" dashbord-first-card" id="mid2-card-dash">
          <BsJournalBookmark className="payment-logo"></BsJournalBookmark>
          <h6 className="payment-tit-das">All-Time Sales</h6>
          <h4 className="payment-tk">Tk:48561.07</h4>
        </div>
      </div>

      <div className="number-of-orders">
        <div className="first-num-order">
          <div className="das-order-div">
            <BsCart className="das-order-logo"></BsCart>
          </div>
          <div className="order-num-info">
            <span>Total Order</span>
            <h3>396</h3>
          </div>
        </div>
        <div className="first-num-order">
          <div className="das-order-div">
            <FaRotate className="das-order-logo"></FaRotate>
          </div>

          <div className="order-num-info">
            <span>Orders Pending</span>
            <h3>396</h3>
          </div>
        </div>
        <div className="first-num-order">
          <div className="das-order-div">
            <GrDeliver className="das-order-logo"></GrDeliver>
          </div>

          <div className="order-num-info">
            <span>Orders Processing</span>
            <h3>396</h3>
          </div>
        </div>
        <div className="first-num-order">
          <div className="das-order-div">
            <TiTick className="das-order-logo"></TiTick>
          </div>

          <div className="order-num-info">
            <span>Orders Delivered</span>
            <h3>396</h3>
          </div>
        </div>
      </div>
      <DashbordChirts></DashbordChirts>
    </div>
  );
};

export default DashbordhomeFirst;
