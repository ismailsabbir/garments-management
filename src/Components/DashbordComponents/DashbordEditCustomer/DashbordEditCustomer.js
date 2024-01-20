import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { BsFillImageFill } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const DashbordEditCustomer = () => {
  const location = useLocation();
  const [customerinfo, setcustomerinfo] = useState();
  const customers = location?.state;
  const [photo, setphoto1] = useState(customers?.photo);

  console.log(customers);
  useEffect(() => {
    setcustomerinfo(customers);
  }, []);

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
  //   const specialCharacters = "!@#$%^&*()_-+=<>?/[]{}|";
  //   const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
  //   const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  //   const numbers = "0123456789";
  //   const allCharacters =
  //     lowercaseLetters + uppercaseLetters + numbers + specialCharacters;
  //   const getRandomChar = (string) =>
  //     string[Math.floor(Math.random() * string.length)];
  //   let password = "";
  //   password += getRandomChar(specialCharacters);
  //   for (let i = password.length; i < 8; i++) {
  //     password += getRandomChar(allCharacters);
  //   }
  //   password = password
  //     .split("")
  //     .sort(() => Math.random() - 0.5)
  //     .join("");
  //   console.log(password);
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
    const id = customerinfo?._id;
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
      id,
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
    console.log(staffinfo);
    fetch(`${process.env.REACT_APP_URL}/edit_customers`, {
      method: "PUT",
      body: JSON.stringify(staffinfo),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data?.sucess) {
          toast("Customer Updated sucessfully !!!", {
            position: "top-center",
            autoClose: 1000,
          });
        } else {
          toast("Customer Updated Failed !!!", {
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
              value={customerinfo?.name}
              onChange={(e) =>
                setcustomerinfo({ ...customerinfo, name: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              className="staff-input"
              type="text"
              placeholder="Customer Name"
              name="lastname"
              value={customerinfo?.lastname}
              onChange={(e) =>
                setcustomerinfo({ ...customerinfo, lastname: e.target.value })
              }
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
              value={customerinfo?.email}
              onChange={(e) =>
                setcustomerinfo({ ...customerinfo, email: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Password</Form.Label>
            <Form.Control
              className="staff-input"
              type="password"
              placeholder="Customer Password"
              name="password"
              value={customerinfo?.password}
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
              value={customerinfo?.phone}
              onChange={(e) =>
                setcustomerinfo({ ...customerinfo, phone: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Account Creation Date</Form.Label>
            <Form.Control
              className="staff-input"
              type="date"
              placeholder="Staff Password"
              name="join"
              value={customerinfo?.created_date}
              // onChange={(e) =>
              //   setcustomerinfo({
              //     ...customerinfo,
              //     created_date: e.target.value,
              //   })
              // }
            />
          </Form.Group>
        </div>
        <div className="staff-first-name-lastname mt-4">
          <select
            className="mb-3 firstname-staff"
            id="staf-select"
            name="role"
            value={customerinfo?.role}
            onChange={(e) =>
              setcustomerinfo({ ...customerinfo, role: e.target.value })
            }
          >
            <option value="Premium">Premium</option>
            <option value="Normal">Normal</option>
          </select>
          <button className="add-staf--btn" variant="primary" type="submit">
            EDIT CUSTOMER INFORMATIONS
          </button>
        </div>
        {/* <div className="staff-first-name-lastname mt-4">
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
          </div> */}
      </Form>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default DashbordEditCustomer;
