import React from "react";
import "./DashbordAddStaff.css";
import { Form } from "react-bootstrap";
import { BsFillImageFill } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
const DashbordAddStaff = () => {
  const [photo, setphoto1] = useState();
  const imagebb = process.env.REACT_APP_IMGBB;
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
    const join_date = e.target.join.value;
    const salary = e.target.salary.value;
    const isEmployee = true;
    const cardId = e.target.cardId.value;

    const staffinfo = {
      name,
      email,
      lastname,
      photo,
      phone,
      password,
      role,
      join_date,
      salary,
      isEmployee,
      cardId,
    };
    console.log(staffinfo);
    fetch(`${process.env.REACT_APP_URL}/addstaff`, {
      method: "POST",
      body: JSON.stringify(staffinfo),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        toast("Staff Add sucessfully !!!", {
          position: "top-center",
          autoClose: 1000,
        });
      });
  };

  return (
    <div className="add-staff-con">
      <h5>Add Staff</h5>
      <p>Add your staff necessary information from here</p>
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
              <p>(Only *.jpeg, *.webp and *.png images will be accepted)</p>
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
              placeholder="Staff Name"
              name="name"
            />
          </Form.Group>
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Last Name Name</Form.Label>
            <Form.Control
              className="staff-input"
              type="text"
              placeholder="Staff Name"
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
              placeholder="Staff Email"
              name="email"
            />
          </Form.Group>
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Password</Form.Label>
            <Form.Control
              className="staff-input"
              type="password"
              placeholder="Staff Password"
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
            <Form.Label>Join Date</Form.Label>
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
            <option value="Manager">Manager</option>
            <option value="Driver">Driver</option>
            <option value="admin">Admin</option>
          </select>
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Salary</Form.Label>
            <Form.Control
              className="staff-input"
              type="text"
              placeholder="salary"
              name="salary"
            />
          </Form.Group>
        </div>
        <div className="staff-first-name-lastname mt-4">
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Card Number</Form.Label>
            <Form.Control
              className="staff-input"
              type="text"
              placeholder="Card Id"
              name="cardId"
            />
          </Form.Group>
          <button className="add-staf--btn" variant="primary" type="submit">
            ADD STAFF
          </button>
        </div>
      </Form>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default DashbordAddStaff;
