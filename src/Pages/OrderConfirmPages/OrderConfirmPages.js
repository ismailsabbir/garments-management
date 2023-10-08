import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./OrderConfirmPages.css";
import { Form, Table } from "react-bootstrap";
import { useEffect } from "react";
import { AuthContext } from "../../Context/UserContext";
import { useContext } from "react";
const OrderConfirmPages = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const orderinfo = state.request_info;
  const [size_s, setsizes] = useState();
  const [size_m, setsizem] = useState();
  const [size_l, setsizel] = useState();
  const [size_xl, setsizexl] = useState();
  const [size_xxl, setsizexxl] = useState();
  const [sum, setSum] = useState(0);
  const [errormessage, seterrormessage] = useState(false);
  const [shoporder, setorders] = useState([]);
  const [cartorder, setcartorder] = useState([]);
  const [customized, setcustomized] = useState([]);
  const [addresss, setaddres] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, userlogout } = useContext(AuthContext);
  const [showorder, setshoworder] = useState([]);
  const [infoerror, setinfoerror] = useState(false);
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
    } else if (cartorder?.length >= 1) {
      setshoworder(cartorder);
      setLoading(false);
    } else if (customized.length >= 1) {
      setshoworder(customized);
      setLoading(false);
    } else if (shoporder.length >= 1) {
      setshoworder(shoporder);
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
    }
  }, [addresss, shoporder, cartorder, customized]);

  console.log(orderinfo);
  const handlesizes = (dress_number) => {
    seterrormessage(false);
    if (!dress_number) {
      const newsum = 0;
      setSum(newsum);
    } else {
      const newsum = parseInt(sum) + parseInt(dress_number);
      setSum(newsum);
      seterrormessage(false);
      const sizes = {
        size: "S",
        dress_number,
      };
      setsizes(sizes);
    }
  };
  const handlesizem = (dress_number) => {
    seterrormessage(false);
    if (!dress_number) {
      const newsum = 0;
      setSum(newsum);
    } else {
      const newsum = parseInt(sum) + parseInt(dress_number);
      setSum(newsum);
      seterrormessage(false);
      const sizes = {
        size: "M",
        dress_number,
      };
      setsizem(sizes);
    }
  };
  const handlesizel = (dress_number) => {
    seterrormessage(false);
    if (!dress_number) {
      const newsum = 0;
      setSum(newsum);
    } else {
      const newsum = parseInt(sum) + parseInt(dress_number);
      setSum(newsum);
      seterrormessage(false);
      const sizes = {
        size: "L",
        dress_number,
      };
      setsizel(sizes);
    }
  };
  const handlesizexl = (dress_number) => {
    seterrormessage(false);
    if (!dress_number) {
      const newsum = 0;
      setSum(newsum);
    } else {
      const newsum = parseInt(sum) + parseInt(dress_number);
      setSum(newsum);
      seterrormessage(false);
      const sizes = {
        size: "XL",
        dress_number,
      };
      setsizexl(sizes);
    }
  };
  const handlesizexxl = (dress_number) => {
    seterrormessage(false);
    if (!dress_number) {
      const newsum = 0;
      setSum(newsum);
    } else {
      const newsum = parseInt(sum) + parseInt(dress_number);
      setSum(newsum);
      seterrormessage(false);
      const sizes = {
        size: "XXL",
        dress_number,
      };
      setsizexxl(sizes);
    }
  };
  console.log(size_s, size_m, size_l, size_xl, size_xxl);
  const handleorderconfirm = (e) => {
    e.preventDefault();
    const postcode = e.target.postcode.value;
    const address = e.target.address.value;
    const note = e.target.note.value;
    const order_status = "confirm";
    const order = "not paid";
    const transiction_id = "";
    if (parseInt(orderinfo?.pices) < sum || sum === 0) {
      seterrormessage(true);
      return;
    }
    if (!postcode || !address || !note) {
      setinfoerror(true);
      return;
    }

    const orderconfirm = {
      ...orderinfo,
      size_s,
      size_m,
      size_l,
      size_xl,
      size_xxl,
      address,
      postcode,
      note,
      order_status,
      order,
      transiction_id,
    };
    fetch(`${process.env.REACT_APP_URL}/requesed_order`, {
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
          navigate("/payment", { state: { orderconfirm } });
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="order-confirm-con">
      {infoerror ? (
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
          <span>Please give all information</span>
        </div>
      ) : (
        <></>
      )}
      {errormessage ? (
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
          <span>
            you selected {sum} items. But the quantity is {orderinfo?.pices}{" "}
          </span>
        </div>
      ) : (
        <></>
      )}
      <div className="order-confirm-top">
        Your order has been Confirm.Thank you
      </div>
      <div className="order-confirm-hed">
        <div className="confirm-left">
          <p>Dear Sir/Madam</p>
          <p>Here is your order summary</p>
        </div>
        <div className="confirm-left">
          <p>Order Id:{orderinfo?.orderid}</p>
        </div>
      </div>
      <div className="order-info-con">
        <Table bordered className="info-table">
          <thead>
            <tr>
              <th>Particulars</th>
              <th>Quentity</th>
              <th>Quality</th>
              <th>Price</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <p>
                  Type:{orderinfo?.category_name}({orderinfo?.colorname})
                </p>
                <h6>Preview</h6>
                <img
                  className="order-image"
                  src={orderinfo?.dress_photo}
                  alt="not found"
                />
              </td>
              <td>{orderinfo?.pices}</td>
              <td>{orderinfo?.qualityname}</td>
              <td>{orderinfo?.price}</td>
              <td>{orderinfo?.total_price}</td>
            </tr>
          </tbody>
        </Table>
      </div>

      <div className="dress-size-con">
        <h6 className="mb-6">you selected {sum} items.</h6>
        <div className="dress-size-quen">
          <p>Size S: {size_s?.dress_number}</p>
          <p>Size M : {size_m?.dress_number}</p>
          <p>Size L: {size_l?.dress_number}</p>
          <p>Size XL: {size_xl?.dress_number}</p>
          <p>Size XXL: {size_xxl?.dress_number}</p>
        </div>

        <div className="dress-sizes">
          <div className="size">
            <h6>Size:S</h6>
            <p>Body:36-38</p>
            <p>Height:26-27</p>
            <input
              className="size-input"
              onChange={(e) => handlesizes(e.target.value)}
              type="text"
              placeholder="...."
            />
          </div>
          <div className="size">
            <h6>Size:M</h6>
            <p>Body:38-40</p>
            <p>Height:27-28</p>
            <input
              className="size-input"
              onChange={(e) => handlesizem(e.target.value)}
              type="text"
              placeholder="...."
            />
          </div>
          <div className="size">
            <h6>Size:L</h6>
            <p>Body:40-42</p>
            <p>Height:28-29</p>
            <input
              className="size-input"
              onChange={(e) => handlesizel(e.target.value)}
              type="text"
              placeholder="...."
            />
          </div>
          <div className="size">
            <h6>Size:XL</h6>
            <p>Body:42-44</p>
            <p>Height:29-30</p>
            <input
              className="size-input"
              onChange={(e) => handlesizexl(e.target.value)}
              type="text"
              placeholder="...."
            />
          </div>
          <div className="size">
            <h6>Size:XXL</h6>
            <p>Body:44-46</p>
            <p>Height:30-31</p>
            <input
              className="size-input"
              onChange={(e) => handlesizexxl(e.target.value)}
              type="text"
              placeholder="...."
            />
          </div>
        </div>
      </div>
      <div className="address-con">
        {showorder?.map((order) => (
          <Form onSubmit={handleorderconfirm}>
            <Form.Group
              className="mb-3 address-input-con"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label className="address-input-lavel">
                Delivery address
              </Form.Label>
              <Form.Control
                className="address-input"
                name="address"
                type="text"
                placeholder={order?.address}
              />
            </Form.Group>
            <Form.Group
              className="mb-3 address-input-con"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label className="address-input-lavel">Post Code</Form.Label>
              <Form.Control
                className="address-input"
                name="postcode"
                type="text"
                placeholder=""
              />
            </Form.Group>
            <Form.Group
              className="mb-3 address-input-con"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label className="address-input-lavel">Note</Form.Label>
              <Form.Control
                className="address-input"
                name="note"
                type="text"
                placeholder=""
              />
            </Form.Group>

            <button type="submit" className="confirm-btn">
              Confirm Order
            </button>
          </Form>
        ))}
      </div>
    </div>
  );
};

export default OrderConfirmPages;
