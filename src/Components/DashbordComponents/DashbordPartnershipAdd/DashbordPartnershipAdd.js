import React, { useState } from "react";
import "./DashbordPartnershipAdd.css";
import { ToastContainer, toast } from "react-toastify";
import { Form } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { BsFillImageFill } from "react-icons/bs";
const DashbordPartnershipAdd = () => {
  const location = useLocation();
  const count = location.state;
  const [company_logo, setphoto1] = useState();
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
          toast("Company logo uploded sucessfully !!!", {
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
    const partnership_id = e.target.partnership_id.value;
    const Company_Name = e.target.Company_Name.value;
    const start = e.target.start.value;

    const staffinfo = {
      partnership_id,
      Company_Name,
      company_logo,
      start,
    };
    console.log(staffinfo);
    fetch(`${process.env.REACT_APP_URL}/add/Partnership`, {
      method: "POST",
      body: JSON.stringify(staffinfo),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data?.sucess) {
          toast("PartnerShip Add sucessfully !!!", {
            position: "top-center",
            autoClose: 1000,
          });
        } else {
          toast("PartnerShipNot Add !!!", {
            position: "top-center",
            autoClose: 1000,
          });
        }
      });
  };

  return (
    <div className="add-staff-con">
      <h5>Add New Partnership</h5>
      <p>Give All Information for Add new Partnership</p>

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
              <p>(Only *.jpeg,*.png images will be accepted)</p>
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
            <Form.Label>PartnerShip ID</Form.Label>
            <Form.Control
              className="staff-input"
              type="text"
              placeholder="Mission ID"
              name="partnership_id"
              value={count + 1}
            />
          </Form.Group>
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Company Name</Form.Label>
            <Form.Control
              className="staff-input"
              type="text"
              placeholder="Company Name"
              name="Company_Name"
            />
          </Form.Group>
        </div>

        <div className="staff-first-name-lastname mt-4">
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Start From</Form.Label>
            <Form.Control
              className="staff-input"
              type="date"
              placeholder="Mission"
              name="start"
            />
          </Form.Group>
          <button className="add-staf--btn" variant="primary" type="submit">
            SAVE NEW PARTNERSHIP INFORMATION
          </button>
        </div>
      </Form>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default DashbordPartnershipAdd;
