import React, { useEffect, useState } from "react";
import { SiPowerpages } from "react-icons/si";
import { BsCart, BsCartCheck, BsJournalBookmark } from "react-icons/bs";
import { FaRotate } from "react-icons/fa6";
import { GrDeliver } from "react-icons/gr";
import { TiTick } from "react-icons/ti";
import "./DashbordhomeFirst.css";
import DashbordChirts from "../DashbordComponents/DashbordChirts/DashbordChirts";
const DashbordhomeFirst = () => {
  console.log("Dashbord Home First");
  const [todayshoporders, settodayshoporders] = useState([]);
  const [todayCustomizedorders, settodayCustomizedorders] = useState([]);
  const [todayshopordersPrice, settodayshopordersprice] = useState("");
  const [todayCustomizedordersPrice, settodayCustomizedordersPrice] =
    useState("");
  const [todayorderprocessing, setodayorderprocessing] = useState([]);
  const [todayorderpending, settodayorderpending] = useState([]);
  const [todayordercancel, settodayordercancel] = useState([]);
  const [todayorderdelivered, setodayorderdelivered] = useState([]);

  const [todaycutomprocessing, setodaycutomprocessing] = useState([]);
  const [todaycutompending, settodaycustompending] = useState([]);
  const [todaycutomcancel, settodaycustomcancel] = useState([]);
  const [todaycutomdelivered, setodaycustomdelivered] = useState([]);

  const [monthshoporders, setmonthshoporders] = useState([]);
  const [monthCustomizedorders, setmonthCustomizedorders] = useState([]);
  const [monthshopordersPrice, setmonthshopordersprice] = useState("");
  const [monthCustomizedordersPrice, setmonthCustomizedordersPrice] =
    useState("");
  const [monthorderprocessing, setmonthorderprocessing] = useState([]);
  const [monthorderpending, setmonthorderpending] = useState([]);
  const [monthordercancel, setmonthordercancel] = useState([]);
  const [monthorderdelivered, setmonthorderdelivered] = useState([]);

  const [monthcutomprocessing, setmontcutomprocessing] = useState([]);
  const [monthcutompending, setmonthcustompending] = useState([]);
  const [monthcutomcancel, setmonthcustomcancel] = useState([]);
  const [monthcutomdelivered, semonthcustomdelivered] = useState([]);

  const [yearhshoporders, setyearshoporders] = useState([]);
  const [yearhCustomizedorders, setyearCustomizedorders] = useState([]);
  const [yearhshopordersPrice, setyearshopordersprice] = useState("");
  const [yearhCustomizedordersPrice, setyearCustomizedordersPrice] =
    useState("");
  const [yesterdayhshoporders, setyesterdayhoporders] = useState([]);
  const [yesterdayhCustomizedorders, setyesterdayCustomizedorders] = useState(
    []
  );
  const [yesterdayhshopordersPrice, setyesterdayshopordersprice] = useState("");
  const [yesterdayhCustomizedordersPrice, setyesterdayCustomizedordersPrice] =
    useState("");
  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/today-orders`)
      .then((res) => res.json())
      .then((data) => {
        settodayshoporders(data?.todayOrders);
        settodayCustomizedorders(data?.todycustomorders);
        settodayshopordersprice(data?.totalPrice);
        settodayCustomizedordersPrice(data?.totla_customized_price);
        settodayorderpending(data?.todayorderpending);
        setodayorderprocessing(data?.todayordersprocessing);
        settodayordercancel(data?.todayordercancel);
        setodayorderdelivered(data?.todayorderdalivered);
        setodaycutomprocessing(data?.todaycustomprocessing);
        settodaycustompending(data?.todaycustomrpending);
        settodaycustomcancel(data?.todaycustomcancel);
        setodaycustomdelivered(data?.todaycustomdalivered);
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
        setmonthorderprocessing(data?.monthorderprocessing);
        setmonthorderpending(data?.monthorderpending);
        setmonthordercancel(data?.monthcancelorders);
        setmonthorderdelivered(data?.monthorderdelivered);

        setmontcutomprocessing(data?.monthcustomprocessing);
        setmonthcustompending(data?.monthcustompending);
        setmonthcustomcancel(data?.monthcustomcancel);
        semonthcustomdelivered(data?.monthcustomdelivered);
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
  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/yesterdayOrders`)
      .then((res) => res.json())
      .then((data) => {
        setyesterdayhoporders(data?.yesterdayshopOrders);
        setyesterdayCustomizedorders(data?.yesterdaycustomorders);
        setyesterdayshopordersprice(data?.totalyesterdayshopPrice);
        setyesterdayCustomizedordersPrice(data?.totalyesterdaycustomPrice);
      });
  }, []);

  return (
    <div className="dashbord-home-first-con">
      <h5 className="mb-4" style={{ color: "#be5184" }}>
        Orders Statistics :
      </h5>
      <div className=" dashbord-home-first-hole">
        <div className=" dashbord-first-card">
          <SiPowerpages className="payment-logo"></SiPowerpages>
          <h6 className="payment-tit-das">Today Orders</h6>
          <h4 className="payment-tk">Tk:{todayshopordersPrice}</h4>
          <h6>NO Orders:{todayCustomizedorders?.length}</h6>
        </div>
        <div className=" dashbord-first-card" id="mid-card-dash">
          <SiPowerpages className="payment-logo"></SiPowerpages>
          <h6 className="payment-tit-das">Yesterday Orders</h6>
          <h4 className="payment-tk">Tk:{yesterdayhshopordersPrice}</h4>
          <h6>NO Orders:{yesterdayhshoporders?.length}</h6>
        </div>
        <div className=" dashbord-first-card" id="mid1-card-dash">
          <BsCartCheck className="payment-logo"></BsCartCheck>
          <h6 className="payment-tit-das">This Month Orders</h6>
          <h4 className="payment-tk">Tk:{monthshopordersPrice}</h4>
          <h6>NO Orders:{monthshoporders?.length}</h6>
        </div>
        <div className=" dashbord-first-card" id="mid2-card-dash">
          <BsJournalBookmark className="payment-logo"></BsJournalBookmark>
          <h6 className="payment-tit-das">All-Time Sales</h6>
          <h4 className="payment-tk">Tk:{yearhshopordersPrice}</h4>
          <h6>NO Orders:{yearhshoporders?.length}</h6>
        </div>
      </div>
      <h5 className="mt-4" style={{ color: "#be5184" }}>
        Customized Orders Statistics :
      </h5>
      <div className=" dashbord-home-first-hole mt-4">
        <div className=" dashbord-first-card" id="customiz_order_rate">
          <SiPowerpages className="payment-logo"></SiPowerpages>
          <h6 className="payment-tit-das">Today Orders</h6>
          <h4 className="payment-tk">Tk:{todayCustomizedordersPrice}</h4>
          <h6>NO Orders:{todayCustomizedorders?.length}</h6>
        </div>
        <div className=" dashbord-first-card" id="customiz_order_rate1">
          <SiPowerpages className="payment-logo"></SiPowerpages>
          <h6 className="payment-tit-das">Yesterday Orders</h6>
          <h4 className="payment-tk">Tk:{yesterdayhCustomizedordersPrice}</h4>
          <h6>NO Orders:{yesterdayhCustomizedorders?.length}</h6>
        </div>
        <div className=" dashbord-first-card" id="customiz_order_rate3">
          <BsCartCheck className="payment-logo"></BsCartCheck>
          <h6 className="payment-tit-das">This Month Orders</h6>
          <h4 className="payment-tk">Tk:{monthCustomizedordersPrice}</h4>
          <h6>NO Orders:{monthCustomizedorders?.length}</h6>
        </div>
        <div className="dashbord-first-card" id="customiz_order_rate_last">
          <BsJournalBookmark className="payment-logo"></BsJournalBookmark>
          <h6 className="payment-tit-das">All-Time Sales</h6>
          <h4 className="payment-tk">Tk:{yearhCustomizedordersPrice}</h4>
          <h6>NO Orders:{yearhCustomizedorders?.length}</h6>
        </div>
      </div>
      <h5 className="mt-4" style={{ color: "#be5184" }}>
        Today Orders Status :
      </h5>
      <div className="number-of-orders">
        <div className="first-num-order">
          <div className="das-order-div">
            <BsCart className="das-order-logo"></BsCart>
          </div>
          <div className="order-num-info">
            <span>Order Cancel</span>
            <h3>{todayordercancel?.length}</h3>
          </div>
        </div>
        <div className="first-num-order">
          <div className="das-order-div">
            <FaRotate className="das-order-logo"></FaRotate>
          </div>

          <div className="order-num-info">
            <span>Orders Pending</span>
            <h3>{todayorderpending?.length}</h3>
          </div>
        </div>
        <div className="first-num-order">
          <div className="das-order-div">
            <GrDeliver className="das-order-logo"></GrDeliver>
          </div>

          <div className="order-num-info">
            <span>Orders Processing</span>
            <h3>{todayorderprocessing?.length}</h3>
          </div>
        </div>
        <div className="first-num-order">
          <div className="das-order-div">
            <TiTick className="das-order-logo"></TiTick>
          </div>

          <div className="order-num-info">
            <span>Orders Delivered</span>
            <h3>{todayorderdelivered?.length}</h3>
          </div>
        </div>
      </div>
      <h5 className="mt-4" style={{ color: "#be5184" }}>
        Today Customized Orders Status :
      </h5>
      <div className="number-of-orders">
        <div className="first-num-order">
          <div className="das-order-div">
            <BsCart className="das-order-logo"></BsCart>
          </div>
          <div className="order-num-info">
            <span>Cancel Order</span>
            <h3>{todaycutomcancel?.length}</h3>
          </div>
        </div>
        <div className="first-num-order">
          <div className="das-order-div">
            <FaRotate className="das-order-logo"></FaRotate>
          </div>

          <div className="order-num-info">
            <span>Orders Pending</span>
            <h3>{todaycutompending?.length}</h3>
          </div>
        </div>
        <div className="first-num-order">
          <div className="das-order-div">
            <GrDeliver className="das-order-logo"></GrDeliver>
          </div>

          <div className="order-num-info">
            <span>Orders Processing</span>
            <h3>{todaycutomprocessing?.length}</h3>
          </div>
        </div>
        <div className="first-num-order">
          <div className="das-order-div">
            <TiTick className="das-order-logo"></TiTick>
          </div>

          <div className="order-num-info">
            <span>Orders Delivered</span>
            <h3>{todaycutomdelivered?.length}</h3>
          </div>
        </div>
      </div>
      <h5 className="mt-4" style={{ color: "#be5184" }}>
        This Month Orders Status :
      </h5>
      <div className="number-of-orders">
        <div className="first-num-order">
          <div className="das-order-div">
            <BsCart className="das-order-logo"></BsCart>
          </div>
          <div className="order-num-info">
            <span>Cancel Order</span>
            <h3>{monthordercancel?.length}</h3>
          </div>
        </div>
        <div className="first-num-order">
          <div className="das-order-div">
            <FaRotate className="das-order-logo"></FaRotate>
          </div>

          <div className="order-num-info">
            <span>Orders Pending</span>
            <h3>{monthorderpending?.length}</h3>
          </div>
        </div>
        <div className="first-num-order">
          <div className="das-order-div">
            <GrDeliver className="das-order-logo"></GrDeliver>
          </div>

          <div className="order-num-info">
            <span>Orders Processing</span>
            <h3>{monthorderprocessing?.length}</h3>
          </div>
        </div>
        <div className="first-num-order">
          <div className="das-order-div">
            <TiTick className="das-order-logo"></TiTick>
          </div>

          <div className="order-num-info">
            <span>Orders Delivered</span>
            <h3>{monthorderdelivered?.length}</h3>
          </div>
        </div>
      </div>
      <h5 className="mt-4" style={{ color: "#be5184" }}>
        This Month Customized Orders Status :
      </h5>
      <div className="number-of-orders">
        <div className="first-num-order">
          <div className="das-order-div">
            <BsCart className="das-order-logo"></BsCart>
          </div>
          <div className="order-num-info">
            <span>Cancel Order</span>
            <h3>{monthcutomcancel?.length}</h3>
          </div>
        </div>
        <div className="first-num-order">
          <div className="das-order-div">
            <FaRotate className="das-order-logo"></FaRotate>
          </div>

          <div className="order-num-info">
            <span>Orders Pending</span>
            <h3>{monthcutompending?.length}</h3>
          </div>
        </div>
        <div className="first-num-order">
          <div className="das-order-div">
            <GrDeliver className="das-order-logo"></GrDeliver>
          </div>

          <div className="order-num-info">
            <span>Orders Processing</span>
            <h3>{monthcutomprocessing?.length}</h3>
          </div>
        </div>
        <div className="first-num-order">
          <div className="das-order-div">
            <TiTick className="das-order-logo"></TiTick>
          </div>

          <div className="order-num-info">
            <span>Orders Delivered</span>
            <h3>{monthcutomdelivered?.length}</h3>
          </div>
        </div>
      </div>
      <DashbordChirts></DashbordChirts>
    </div>
  );
};

export default DashbordhomeFirst;
