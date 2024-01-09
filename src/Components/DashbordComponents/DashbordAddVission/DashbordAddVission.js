import React from "react";
import { Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

const DashbordAddVission = () => {
  const handlestaffedit = (e) => {
    e.preventDefault();
    const vission_id = e.target.vission_id.value.toString();
    const vision = e.target.vision.value.toString();
    const staffinfo = {
      vission_id,
      vision,
    };
    console.log(staffinfo);
    fetch(`${process.env.REACT_APP_URL}/vission/add`, {
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
          toast("Vission Add  sucessfully !!!", {
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
      <h5>Add New Vission</h5>
      <p>Give All Information for Add new Vission</p>

      <Form onSubmit={handlestaffedit} className="add-staff-form">
        <div className="staff-first-name-lastname mt-4">
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Mission ID</Form.Label>
            <Form.Control
              className="staff-input"
              type="text"
              placeholder="Mission ID"
              name="vission_id"
            />
          </Form.Group>
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Our Vission</Form.Label>
            <Form.Control
              className="staff-input"
              type="text"
              placeholder="CatVissiongory"
              name="vision"
            />
          </Form.Group>
        </div>

        <div className="staff-first-name-lastname mt-4">
          <button className="add-staf--btn" variant="primary" type="submit">
            Save VISSION INFORMATION
          </button>
        </div>
      </Form>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default DashbordAddVission;
