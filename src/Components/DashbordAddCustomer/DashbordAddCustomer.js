import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { BsFillImageFill } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";

const DashbordAddCustomer = () => {
  const [photo, setphoto1] = useState();
  const imagebb = process.env.REACT_APP_IMGBB;
  console.log("Add Customer");
  const handleimage1 = (e) => {
    const image1 = e.target.files[0];
    const formdata = new FormData();
    formdata.append("image", image1);
    const url = `https://api.imgbb.com/1/upload?key=${imagebb}`;
    fetch(url, {
      method: "POST",
      body: formdata,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setphoto1(data.data.url);
          toast("Profile Image uploded sucessfully !!!", {
            position: "top-center",
            autoClose: 1000,
          });
        }
      })
      .catch((error) => {
        toast("Profile Image not uploded!!!", {
          position: "top-center",
          autoClose: 1000,
        });
      });
  };
  const handlestaffadd = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const lastname = e.target.lastname.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const password = e.target.password.value;
    const role = e.target.role.value;
    const created_date = e.target.join.value;
    const isCustomer = true;
    if (password.length < 8) {
      toast("Password must be 8 characters !!!", {
        position: "top-center",
        autoClose: 1000,
      });
      return;
    }
    if (!/(?=.*[!@#$&*])/.test(password)) {
      toast("Password must have a special character!!!", {
        position: "top-center",
        autoClose: 1000,
      });
      return;
    }

    const staffinfo = {
      name,
      email,
      lastname,
      photo,
      phone,
      password,
      role,
      created_date,
      isCustomer,
    };
    fetch(`${process.env.REACT_APP_URL}/add/customer`, {
      method: "POST",
      body: JSON.stringify(staffinfo),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.error) {
          toast(data?.error, {
            position: "top-center",
            autoClose: 1000,
          });
        } else {
          toast("Customer Add sucessfully !!!", {
            position: "top-center",
            autoClose: 1000,
          });
        }
      });
  };
  return (
    <div className="add-staff-con">
      <h5>Add Customer</h5>
      <p>Add your Customer necessary information from here</p>
      <Form onSubmit={handlestaffadd} className="add-staff-form">
        <div className="staff-image-con">
          <Form.Group className="mb-3">
            <label
              for="input-file1"
              id="file"
              className="border-dashed border-2 border-green-700"
            >
              <BsFillImageFill className="image-icon"></BsFillImageFill>
              <h6>Drag your images here</h6>
              <p>(Only *.jpeg, and *.png images will be accepted)</p>
              <input
                type="file"
                id="input-file1"
                className="fileinput"
                name="image"
                onChange={handleimage1}
              />
            </label>
          </Form.Group>
        </div>

        <div className="staff-first-name-lastname mt-4">
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              className="staff-input"
              type="text"
              placeholder="Customer Name"
              name="name"
            />
          </Form.Group>
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              className="staff-input"
              type="text"
              placeholder="Customer Name"
              name="lastname"
            />
          </Form.Group>
        </div>
        <div className="staff-first-name-lastname mt-4">
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Email</Form.Label>
            <Form.Control
              className="staff-input"
              type="email"
              placeholder="Customer Email"
              name="email"
            />
          </Form.Group>
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Password</Form.Label>
            <Form.Control
              className="staff-input"
              type="password"
              placeholder="Customer Password"
              name="password"
            />
          </Form.Group>
        </div>
        <div className="staff-first-name-lastname mt-4">
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Contact </Form.Label>
            <Form.Control
              className="staff-input"
              type="text"
              placeholder="Contact number"
              name="phone"
            />
          </Form.Group>
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Account Creation Date</Form.Label>
            <Form.Control
              className="staff-input"
              type="date"
              placeholder="Staff Password"
              name="join"
            />
          </Form.Group>
        </div>
        <div className="staff-first-name-lastname mt-4">
          <select className="mb-3 firstname-staff" id="staf-select" name="role">
            <option value="Premium">Premium</option>
            <option value="Normal">Normal</option>
          </select>
          <button className="add-staf--btn" variant="primary" type="submit">
            ADD NEW CUSTOMER
          </button>
        </div>
      </Form>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default DashbordAddCustomer;
