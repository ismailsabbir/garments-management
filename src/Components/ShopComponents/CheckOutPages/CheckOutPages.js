import React from "react";
import { Form } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./CheckOutPages.css";
import { useState } from "react";
import { useEffect } from "react";
const CheckOutPages = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const shopinfo = location.state;
  const [name, setfirstname] = useState();
  const [lastname, setlastname] = useState();
  const [country, setcountry] = useState();
  const [address, setcity] = useState();
  const [postcode, setpostcode] = useState();
  const [email, setemail] = useState();
  const [phone, setmobile] = useState();
  const [note, setmesssage] = useState();
  const [errorinfo, seterrorinfo] = useState(false);
  console.log(shopinfo);
  useEffect(() => {
    if (!shopinfo) {
      navigate("/shop");
      console.log("not shop");
    }
  }, []);
  // const { product_name, size } = shopinfo;
  const firstnamehandle = (e) => {
    const firstname = e.target.value;
    setfirstname(firstname);
  };
  const lastnamehandle = (e) => {
    const lastname = e.target.value;
    setlastname(lastname);
  };
  const countryhandler = (e) => {
    const country = e.target.value;
    setcountry(country);
  };
  const cityhandler = (e) => {
    const city = e.target.value;
    setcity(city);
  };
  const postcodehander = (e) => {
    const code = e.target.value;
    setpostcode(code);
  };
  const emailhander = (e) => {
    const email = e.target.value;
    setemail(email);
  };
  const mobilrhandler = (e) => {
    const mobile = e.target.value;
    setmobile(mobile);
  };
  const messagehandler = (e) => {
    const message = e.target.value;
    setmesssage(message);
  };

  const total_price =
    parseFloat(shopinfo?.product_price) * parseFloat(shopinfo?.quentuty) + 20;
  const today = new Date();
  const orderid = Math.floor(Math.random() * 90000) + 10000;
  const order_date = new Date().toLocaleDateString("en-GB");
  const nextdate = new Date(today.setDate(today.getDate() + 4));
  const delivery_date = nextdate.toLocaleDateString("en-GB");
  const handleorderconfirm = (e) => {
    e.preventDefault();
    const order_status = "confirm";
    const order = "not paid";
    const transiction_id = "";
    const {
      product_name,
      size,
      quentuty,
      product_price,
      Product_image,
      daisplay_image,
    } = shopinfo;
    const category_name = product_name;
    const pices = quentuty;
    const price = product_price;
    const dress_photo = Product_image;
    const backphoto = daisplay_image;
    const qualityname = "Premium";
    const orderconfirm = {
      name,
      lastname,
      country,
      address,
      email,
      note,
      phone,
      postcode,
      pices,
      size,
      price,
      total_price,
      category_name,
      dress_photo,
      backphoto,
      qualityname,
      order_date,
      delivery_date,
      order_status,
      order,
      transiction_id,
      orderid,
    };
    if (!name || !lastname || !email || !phone || !address || !postcode) {
      seterrorinfo(true);
      return;
    }
    fetch(`${process.env.REACT_APP_URL}/shoporder`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(orderconfirm),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data._id);
        if (data._id) {
          navigate("/shoppayment", { state: { orderconfirm } });
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div className="checkout-container-hole">
      <div className="checkoutlogin">
        <p>
          Returning customer?{" "}
          <Link to="/logon" className="login-link-c">
            Click here to login
          </Link>{" "}
        </p>
      </div>
      <div className="checkoutlogin">
        <p>
          Have a coupon?{" "}
          <Link to="/" className="login-link-c">
            login-link-c
          </Link>
        </p>
      </div>
      {errorinfo ? (
        <div className="checkoutlogin">
          <div className="alert alert-warning">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>Please give all information!</span>
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className="checkout-info-con">
        <Form className="checkout-inforow-col row">
          <div className="checkout-info-con-left col col-12 col-sm-12 col-md-12 col-lg-8">
            <h4 className="biling-text">Billing Details</h4>
            {/* <form> */}
            <div className="first-name-last-name">
              <input
                type="text"
                placeholder="First Name"
                name="firstname"
                className="mr-8"
                onChange={firstnamehandle}
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                name="last_name"
                onChange={lastnamehandle}
              />
            </div>
            <input
              type="text"
              placeholder="Company Name"
              className="company-input"
            />
            <select
              className="country-selected"
              id="cars"
              name="cars"
              onChange={countryhandler}
              required
            >
              <option value="Bangladesh">Bangladesh</option>
              <option value="fiat">India</option>
              <option value="audi">Bangladesh</option>
            </select>
            <input
              type="text"
              placeholder="City"
              className="company-input"
              onChange={cityhandler}
            />
            <input
              type="text"
              placeholder="PostCode/ZIP"
              className="company-input"
              onChange={postcodehander}
              required
            />

            <input
              type="email"
              placeholder="Email"
              className="company-input"
              onChange={emailhander}
              required
            />
            <input
              type="text"
              placeholder="Mobile Number"
              className="company-input"
              onChange={mobilrhandler}
              required
            />
            <textarea
              name="note"
              placeholder="Notes about your order.Ex-Specail node for deliery"
              className="note-input"
              onChange={messagehandler}
            />
            {/* </form> */}
          </div>
          <div className="checkout-info-right col col-12 col-sm-12 col-md-12 col-lg-3">
            <h5>Your Order</h5>
            <div className="checkout-product-con">
              <div className="checkout-product">
                <div className="checkout-product-info">
                  <img src={shopinfo?.Product_image} alt="not found" />
                  <div>
                    <p>{shopinfo?.product_name} </p>
                    <p className="checkout-price">${shopinfo?.product_price}</p>
                  </div>
                </div>
                <p>QTY {shopinfo?.quentuty}</p>
              </div>
              <div className="checkout-subtotla">
                <p>Subtotal</p>
                <h6>
                  $
                  {parseFloat(shopinfo?.product_price) *
                    parseFloat(shopinfo?.quentuty)}
                </h6>
              </div>
              <h6>Shipping</h6>
              <div className="checkout-shipping">
                <p>Delivery Fee:</p>
                <h6>$20</h6>
              </div>
              <div className="checkout-totla">
                <p>Total:</p>
                <p>
                  $
                  {parseFloat(shopinfo?.product_price) *
                    parseFloat(shopinfo?.quentuty) +
                    20}
                </p>
              </div>
              <p className="checkout-personal">
                Your personal data will be used to process your order, support
                your experience throughout this website, and for other purposes
                described in our privacy policy.
              </p>
              {/* <Link to="/shoppayment" state={{ orderconfirm }}> */}
              <button
                onClick={handleorderconfirm}
                type="submit"
                className="place-order-btn"
              >
                Confirm Order
              </button>
              {/* </Link> */}
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CheckOutPages;
