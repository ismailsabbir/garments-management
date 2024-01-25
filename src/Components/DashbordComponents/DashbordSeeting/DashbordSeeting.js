import React, { useEffect, useState } from "react";
import "./DashbordSeeting.css";
import { Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
const DashbordSeeting = () => {
  const [information, setinformation] = useState([]);
  console.log("Dashbord Seeting");
  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/seetinginfo`)
      .then((res) => res.json())
      .then((data) => setinformation(data));
  }, []);
  const handleseeting = (e) => {
    e.preventDefault();
    const company_name = e.target.companyname.value;
    const address = e.target.address.value;
    const postcode = e.target.postcode.value;
    const contact = e.target.contact.value;
    const email = e.target.email.value;
    const discount = e.target.discount.value;
    const seetinginfo = {
      company_name,
      address,
      postcode,
      contact,
      email,
      discount,
    };
    fetch(`${process.env.REACT_APP_URL}/seetinginfo/${information?._id}`, {
      method: "PUT",
      body: JSON.stringify(seetinginfo),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        toast("Setting Sucessfully !!!", {
          position: "top-center",
          autoClose: 1000,
        });
      });
  };
  return (
    <div>
      <h5>Settings</h5>
      <div className="seeting_con">
        <Form onSubmit={handleseeting}>
          <Form.Group id="input_con">
            <Form.Label className="setting_input">Company Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Company Name"
              name="companyname"
              value={information?.company_name}
              onChange={(e) =>
                setinformation({ ...information, company_name: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group id="input_con">
            <Form.Label className="setting_input">Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Address"
              name="address"
              value={information?.address}
              onChange={(e) =>
                setinformation({ ...information, address: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group id="input_con">
            <Form.Label className="setting_input">Post Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Post Code"
              name="postcode"
              value={information?.postcode}
              onChange={(e) =>
                setinformation({ ...information, postcode: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group id="input_con">
            <Form.Label className="setting_input">Contact</Form.Label>
            <Form.Control
              type="text"
              placeholder="Contact"
              name="contact"
              value={information?.contact}
              onChange={(e) =>
                setinformation({ ...information, contact: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group id="input_con">
            <Form.Label className="setting_input">Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Email"
              name="email"
              value={information?.email}
              onChange={(e) =>
                setinformation({ ...information, email: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group id="input_con">
            <Form.Label className="setting_input">
              Whole Sale Discount
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Discount"
              name="discount"
              value={information?.discount}
              onChange={(e) =>
                setinformation({ ...information, discount: e.target.value })
              }
            />
          </Form.Group>

          <button type="submit" className="seeting_btn">
            Settings
          </button>
        </Form>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default DashbordSeeting;
