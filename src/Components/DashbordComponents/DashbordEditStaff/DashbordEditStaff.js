import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { BsFillImageFill } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const DashbordEditStaff = () => {
  const [userData, setUserData] = useState({});
  const location = useLocation();
  const staff = location?.state;
  console.log(staff);
  useEffect(() => {
    setUserData(staff);
  }, {});

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
        }
      });
  };
  console.log(photo);
  const handlestaffedit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const lastname = e.target.lastname.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const password = e.target.password.value;
    const role = e.target.role.value;
    const join_date = e.target.join.value;
    const staffinfo = {
      name,
      email,
      lastname,
      photo,
      phone,
      password,
      role,
      join_date,
    };
    console.log(staffinfo);
    fetch(`${process.env.REACT_APP_URL}/edit_staff/${staff?._id}`, {
      method: "PUT",
      body: JSON.stringify(staffinfo),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        toast("Update sucessfully !!!", {
          position: "top-center",
          autoClose: 1000,
        });
      });
  };
  return (
    <div className="add-staff-con">
      <h5>Update Staff</h5>
      <p>Updated your staff necessary information from here</p>

      <Form onSubmit={handlestaffedit} className="add-staff-form">
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
              value={userData?.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
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
              value={userData?.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
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
              value={userData?.phone}
              onChange={(e) =>
                setUserData({ ...userData, phone: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Join Date</Form.Label>
            <Form.Control
              className="staff-input"
              type="date"
              placeholder="Staff Password"
              name="join"
              value={userData?.join_date}
              onChange={(e) =>
                setUserData({ ...userData, join_date: e.target.value })
              }
            />
          </Form.Group>
        </div>
        <div className="staff-first-name-lastname mt-4">
          <select
            className="mb-3 firstname-staff"
            id="staf-select"
            name="role"
            value={userData?.role}
            onChange={(e) => setUserData({ ...userData, role: e.target.value })}
          >
            <option value="Manager">Manager</option>
            <option value="Driver">Driver</option>
            <option value="Admin">Admin</option>
          </select>
          <button className="add-staf--btn" variant="primary" type="submit">
            UPDATE STAFF INFORMATION
          </button>
        </div>
      </Form>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default DashbordEditStaff;
