import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./OrderConfirmPages.css";
import { Form, Table } from "react-bootstrap";
// import useFetch from "../../Hooks/useFetch";
const OrderConfirmPages = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const orderinfo = state.request_info;
  const [size_s, setsizes] = useState();
  const [size_m, setsizem] = useState();
  const [size_l, setsizel] = useState();
  const [size_xl, setsizexl] = useState();
  const [size_xxl, setsizexxl] = useState();
  // const [custom_size, setcustom_size] = useState();
  // const { data } = useFetch(`${process.env.REACT_APP_URL}/dress_size`);

  const handlesizes = (dress_number) => {
    const sizes = {
      size: "S",
      dress_number,
    };
    setsizes(sizes);
  };

  const handlesizem = (dress_number) => {
    const sizes = {
      size: "M",
      dress_number,
    };
    setsizem(sizes);
  };
  const handlesizel = (dress_number) => {
    const sizes = {
      size: "L",
      dress_number,
    };
    setsizel(sizes);
  };
  const handlesizexl = (dress_number) => {
    const sizes = {
      size: "XL",
      dress_number,
    };
    setsizexl(sizes);
  };
  const handlesizexxl = (dress_number) => {
    const sizes = {
      size: "XXL",
      dress_number,
    };
    setsizexxl(sizes);
  };
  console.log(size_s, size_m, size_l, size_xl, size_xxl);
  const handleorderconfirm = (e) => {
    e.preventDefault();
    const address = e.target.address.value;
    const note = e.target.note.value;
    const order_status = "confirm";
    const order = "not paid";
    const transiction_id = "";
    const orderconfirm = {
      ...orderinfo,
      size_s,
      size_m,
      size_l,
      size_xl,
      size_xxl,
      address,
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
      </div>
    </div>
  );
};

export default OrderConfirmPages;
