import React from "react";
import { Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

const DashbordMissionAdd = () => {
  const handlestaffedit = (e) => {
    e.preventDefault();
    const mission_id = e.target.mission_id.value.toString();
    const mission = e.target.mission.value.toString();
    const staffinfo = {
      mission_id,
      mission,
    };
    console.log(staffinfo);
    fetch(`${process.env.REACT_APP_URL}/mission/add`, {
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
          toast("Mission Add  sucessfully !!!", {
            position: "top-center",
            autoClose: 1000,
          });
        } else {
          toast("Failed !!!", {
            position: "top-center",
            autoClose: 1000,
          });
        }
      });
  };
  return (
    <div className="add-staff-con">
      <h5>Add New Mission</h5>
      <p>Give All Information for Add new Mission</p>

      <Form onSubmit={handlestaffedit} className="add-staff-form">
        <div className="staff-first-name-lastname mt-4">
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Mission ID</Form.Label>
            <Form.Control
              className="staff-input"
              type="text"
              placeholder="Mission ID"
              name="mission_id"
            />
          </Form.Group>
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Our Mission</Form.Label>
            <Form.Control
              className="staff-input"
              type="text"
              placeholder="Mission"
              name="mission"
            />
          </Form.Group>
        </div>

        <div className="staff-first-name-lastname mt-4">
          <button className="add-staf--btn" variant="primary" type="submit">
            Save MISSION INFORMATION
          </button>
        </div>
      </Form>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default DashbordMissionAdd;
