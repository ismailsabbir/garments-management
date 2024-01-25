import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const DashbordMissionEdit = () => {
  const location = useLocation();
  const vissio = location?.state;
  const [vission, setmission] = useState({});
  console.log("Dashbord Mission Edit");
  useEffect(() => {
    setmission(vissio);
  }, []);
  const handlestaffedit = (e) => {
    e.preventDefault();
    const mission_id = e.target.mission_id.value.toString();
    const mission = e.target.mission.value.toString();
    const staffinfo = {
      mission_id,
      mission,
    };
    fetch(`${process.env.REACT_APP_URL}/edit_mission/${vission?._id}`, {
      method: "PUT",
      body: JSON.stringify(staffinfo),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
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
      <h5>Edit Mission</h5>
      <p>Updated your Mission</p>
      <Form onSubmit={handlestaffedit} className="add-staff-form">
        <div className="staff-first-name-lastname mt-4">
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Mission ID</Form.Label>
            <Form.Control
              className="staff-input"
              type="text"
              placeholder="Mission ID"
              name="mission_id"
              value={vission?.mission_id}
              onChange={(e) =>
                setmission({ ...vission, mission_id: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Our Vission</Form.Label>
            <Form.Control
              className="staff-input"
              type="text"
              placeholder="vission"
              name="mission"
              value={vission?.mission}
              onChange={(e) =>
                setmission({ ...vission, mission: e.target.value })
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

export default DashbordMissionEdit;
