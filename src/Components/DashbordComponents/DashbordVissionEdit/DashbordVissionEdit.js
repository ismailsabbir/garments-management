import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const DashbordVissionEdit = () => {
  const location = useLocation();
  const vissio = location?.state;
  const [vission, setmission] = useState({});
  useEffect(() => {
    setmission(vissio);
  }, []);
  const handlestaffedit = (e) => {
    e.preventDefault();
    const vission_id = e.target.vission_id.value.toString();
    const vision = e.target.vision.value.toString();
    const staffinfo = {
      vission_id,
      vision,
    };
    console.log(staffinfo);
    fetch(`${process.env.REACT_APP_URL}/edit_vission/${vission?._id}`, {
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
          toast("Update sucessfully !!!", {
            position: "top-center",
            autoClose: 1000,
          });
        } else {
          toast("Update Failed !!!", {
            position: "top-center",
            autoClose: 1000,
          });
        }
      });
  };
  return (
    <div className="add-staff-con">
      <h5>Edit Vission</h5>
      <p>Updated your Vission</p>

      <Form onSubmit={handlestaffedit} className="add-staff-form">
        <div className="staff-first-name-lastname mt-4">
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Mission ID</Form.Label>
            <Form.Control
              className="staff-input"
              type="text"
              placeholder="Mission ID"
              name="vission_id"
              value={vission?.vission_id}
              onChange={(e) =>
                setmission({ ...vission, vission_id: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Our Vission</Form.Label>
            <Form.Control
              className="staff-input"
              type="text"
              placeholder="vission"
              name="vision"
              value={vission?.vision}
              onChange={(e) =>
                setmission({ ...vission, vision: e.target.value })
              }
            />
          </Form.Group>
        </div>

        <div className="staff-first-name-lastname mt-4">
          <button className="add-staf--btn" variant="primary" type="submit">
            UPDATE VISSION INFORMATION
          </button>
        </div>
      </Form>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default DashbordVissionEdit;
