import React, { useContext } from "react";
import { Form } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./CheckOutPages.css";
import { useState } from "react";
import { useEffect } from "react";
import { AuthContext } from "../../../Context/UserContext";
import { FaGift } from "react-icons/fa";
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
  const [shoporder, setorders] = useState([]);
  const [cartorder, setcartorder] = useState([]);
  const [customized, setcustomized] = useState([]);
  const [addresss, setaddres] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, userlogout } = useContext(AuthContext);
  const [showorder, setshoworder] = useState([]);
  const [showorder1, setshoworder1] = useState([]);
  const [userinfo, setuserinfo] = useState([]);
  const [isRewardUse, setisRewardUse] = useState(false);
  const [reward, setreward] = useState();
  console.log(userinfo);
  useEffect(() => {
    setreward(userinfo?.reward);
  }, []);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/singleuser?email=${user?.email}`, {
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
        setuserinfo(jsonData);
        // setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch data:", error);
        setLoading(false);
      });
  }, [user?.email, userlogout]);
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
    if (addresss?.length >= 1) {
      setshoworder(addresss);
      setshoworder1(addresss);
    } else if (cartorder?.length >= 1) {
      setshoworder(cartorder);
      setshoworder1(cartorder);
      setLoading(false);
    } else if (customized.length >= 1) {
      setshoworder(customized);
      setshoworder1(customized);
      setLoading(false);
    } else if (shoporder.length >= 1) {
      setshoworder(shoporder);
      setshoworder1(shoporder);
      setLoading(false);
    } else {
      setshoworder([
        {
          name: "Enter Name",
          address: "House Number/Road Name/City/District",
          phone: "Mobile Number",
          email: "Enter Email",
        },
      ]);
      setshoworder1([
        {
          name: "Enter Name",
          address: "House Number/Road Name/City/District",
          phone: "Mobile Number",
          email: "Enter Email",
        },
      ]);
    }
  }, [addresss, shoporder, cartorder, customized]);
  console.log(showorder1);
  useEffect(() => {
    if (!shopinfo) {
      navigate("/shop");
      console.log("not shop");
    }
  }, []);
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
  const productinfo = [{ ...shopinfo }];
  let total_price = 0;
  if (userinfo?.role === "Premium" && isRewardUse) {
    total_price =
      parseFloat(shopinfo?.product_price) * parseFloat(shopinfo?.quentuty) -
      parseInt(reward) -
      (parseFloat(shopinfo?.product_price) *
        parseFloat(shopinfo?.quentuty) *
        20) /
        100 +
      20;
    console.log("userinfo?.role === Premium && userinfo?.reward", total_price);
  } else if (isRewardUse) {
    total_price =
      parseFloat(shopinfo?.product_price) * parseFloat(shopinfo?.quentuty) +
      20 -
      parseInt(reward);
  } else if (userinfo?.role === "Premium") {
    total_price =
      parseFloat(shopinfo?.product_price) * parseFloat(shopinfo?.quentuty) -
      (parseFloat(shopinfo?.product_price) *
        parseFloat(shopinfo?.quentuty) *
        20) /
        100 +
      20;
  } else {
    total_price =
      parseFloat(shopinfo?.product_price) * parseFloat(shopinfo?.quentuty) + 20;
  }
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
    const status = "Pending";
    const createdAt = new Date();
    const orderconfirm = {
      reward,
      createdAt,
      isRewardUse,
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
      productinfo,
      status,
    };
    console.log("orderconfirm", orderconfirm);
    if (!name || !lastname || !email || !phone || !address || !postcode) {
      seterrorinfo(true);
      window.scrollTo({ top: 150, behavior: "smooth" });
      return;
    }
    fetch(`${process.env.REACT_APP_URL}/shoporder?userid=${userinfo?._id}`, {
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
  const handleRewardYes = () => {
    setisRewardUse(true);
    if (
      userinfo?.reward >=
      parseFloat(shopinfo?.product_price) * parseFloat(shopinfo?.quentuty) + 20
    ) {
      setreward(
        parseFloat(shopinfo?.product_price) * parseFloat(shopinfo?.quentuty) +
          20
      );
    } else {
      setreward(userinfo?.reward);
    }
  };
  const handleRewardNo = () => {
    setisRewardUse(false);
  };
  console.log(total_price);
  return (
    <div className="checkout-container-hole">
      {userinfo?.reward >= 1 ? (
        <div className="checkoutlogin">
          <div className="gift_available">
            <FaGift className="gift_icon" />
            <p>Available Reward : {userinfo?.reward}</p>
          </div>
          <div className="use_gift_btn">
            {isRewardUse ? (
              <></>
            ) : (
              <button onClick={handleRewardYes}>Yes ! Reward Use</button>
            )}
            {isRewardUse ? (
              <button onClick={handleRewardNo}>Not Use Reward</button>
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}

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
        {showorder?.map((order) => (
          <Form className="checkout-inforow-col row">
            <div className="checkout-info-con-left col col-12 col-sm-12 col-md-12 col-lg-8">
              <h4 className="biling-text">Billing Details</h4>
              {/* <form> */}
              <div className="first-name-last-name">
                <input
                  type="text"
                  placeholder={order?.name}
                  name="name"
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
                <option value="India">India</option>
                <option value="Bangladesh">Bangladesh</option>
              </select>
              <input
                type="text"
                name="address"
                // placeholder="House Number, Road Name,City,District"
                placeholder={order?.address}
                className="company-input"
                onChange={cityhandler}
              />
              <input
                type="text"
                name="code"
                placeholder="PostCode/ZIP"
                className="company-input"
                onChange={postcodehander}
                required
              />

              <input
                type="email"
                name="email"
                placeholder={order?.email}
                className="company-input"
                onChange={emailhander}
                required
              />
              <input
                type="text"
                name="mobile"
                placeholder={order?.phone}
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
                      <p className="checkout-price">
                        ${shopinfo?.product_price}
                      </p>
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
                {isRewardUse ? (
                  <div className="checkout-subtotla">
                    <p className="whole-sale-discount1">
                      After Reward Discount Price{" "}
                    </p>
                    <h6 className="discount-amount1">
                      $
                      {parseFloat(shopinfo?.product_price) *
                        parseFloat(shopinfo?.quentuty) -
                        parseInt(reward)}
                    </h6>
                  </div>
                ) : (
                  <></>
                )}
                {userinfo?.role === "Premium" ? (
                  <div className="checkout-subtotla">
                    <p className="whole-sale-discount">
                      Discount (20%) For WholeSale
                    </p>
                    <h6 className="discount-amount">
                      $
                      {parseFloat(shopinfo?.product_price) *
                        parseFloat(shopinfo?.quentuty) -
                        (parseFloat(shopinfo?.product_price) *
                          parseFloat(shopinfo?.quentuty) *
                          20) /
                          100}
                    </h6>
                  </div>
                ) : (
                  <></>
                )}

                <h6>Shipping</h6>
                <div className="checkout-shipping">
                  <p>Delivery Fee:</p>
                  <h6>$20</h6>
                </div>
                {userinfo?.role === "Premium" && isRewardUse ? (
                  <div className="checkout-totla">
                    <p>Total:</p>
                    {userinfo?.role === "Premium" ? (
                      <p>
                        $
                        {parseFloat(shopinfo?.product_price) *
                          parseFloat(shopinfo?.quentuty) -
                          parseInt(reward) -
                          (parseFloat(shopinfo?.product_price) *
                            parseFloat(shopinfo?.quentuty) *
                            20) /
                            100 +
                          20}
                      </p>
                    ) : (
                      <p>
                        $
                        {parseFloat(shopinfo?.product_price) *
                          parseFloat(shopinfo?.quentuty) +
                          20}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="checkout-totla">
                    <p>Total:</p>
                    {userinfo?.role === "Premium" ? (
                      <p>
                        $
                        {parseFloat(shopinfo?.product_price) *
                          parseFloat(shopinfo?.quentuty) -
                          (parseFloat(shopinfo?.product_price) *
                            parseFloat(shopinfo?.quentuty) *
                            20) /
                            100 +
                          20}
                      </p>
                    ) : (
                      <>
                        {isRewardUse ? (
                          <p>
                            $
                            {parseFloat(shopinfo?.product_price) *
                              parseFloat(shopinfo?.quentuty) +
                              20 -
                              parseInt(reward)}
                          </p>
                        ) : (
                          <p>
                            $
                            {parseFloat(shopinfo?.product_price) *
                              parseFloat(shopinfo?.quentuty) +
                              20}
                          </p>
                        )}
                        {/* <p>
                          $
                          {parseFloat(shopinfo?.product_price) *
                            parseFloat(shopinfo?.quentuty) +
                            20}
                        </p> */}
                      </>
                    )}
                  </div>
                )}
                {/* <div className="checkout-totla">
                  <p>Total:</p>
                  {userinfo?.role === "Premium" ? (
                    <p>
                      $
                      {parseFloat(shopinfo?.product_price) *
                        parseFloat(shopinfo?.quentuty) -
                        (parseFloat(shopinfo?.product_price) *
                          parseFloat(shopinfo?.quentuty) *
                          20) /
                          100 +
                        20}
                    </p>
                  ) : (
                    <p>
                      $
                      {parseFloat(shopinfo?.product_price) *
                        parseFloat(shopinfo?.quentuty) +
                        20}
                    </p>
                  )}
                </div> */}
                <p className="checkout-personal">
                  Your personal data will be used to process your order, support
                  your experience throughout this website, and for other
                  purposes described in our privacy policy.
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
        ))}
      </div>
    </div>
  );
};

export default CheckOutPages;
