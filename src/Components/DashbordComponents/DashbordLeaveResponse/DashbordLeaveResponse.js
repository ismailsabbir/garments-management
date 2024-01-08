import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const DashbordLeaveResponse = () => {
  const { state } = useLocation();
  const [leaveinfo, setleaveinfo] = useState([]);
  const [notice, setnotice] = useState("");
  useEffect(() => {
    setleaveinfo(state);
  }, []);
  const handlenotice = (notice) => {
    setnotice(notice);
  };
  const handlestaffadd = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const from_date = e.target.from_date.value;
    const to_date = e.target.to_date.value;
    const leave_status = e.target.leave_status.value;
    const reason = e.target.reason.value;
    const request_number = state?.request_number;
    const no_day = e.target.no_day.value;
    const leaveinfo = {
      name,
      email,
      no_day,
      notice,
      from_date,
      to_date,
      leave_status,
      reason,
      request_number,
    };
    console.log(leaveinfo);
    fetch(`${process.env.REACT_APP_URL}/leave/Response/edit`, {
      method: "PUT",
      body: JSON.stringify(leaveinfo),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.sucess) {
          toast("Updated sucessfully !!!", {
            position: "top-center",
            autoClose: 1000,
          });
        } else {
          toast("Updated Failed !!!", {
            position: "top-center",
            autoClose: 1000,
          });
        }
      });
  };
  return (
    <div className="add-staff-con">
      <h5>Edit Leave Request</h5>
      <p>Please give information from here</p>
      <Form onSubmit={handlestaffadd} className="add-staff-form">
        <div className="staff-first-name-lastname mt-4">
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              className="staff-input"
              type="text"
              placeholder="Staff Name"
              name="name"
              value={leaveinfo?.name}
              onChange={(e) =>
                setleaveinfo({ ...leaveinfo, name: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Email</Form.Label>
            <Form.Control
              className="staff-input"
              type="email"
              placeholder="Staff Email"
              name="email"
              value={leaveinfo?.email}
              onChange={(e) =>
                setleaveinfo({ ...leaveinfo, email: e.target.value })
              }
            />
          </Form.Group>
        </div>

        <div className="staff-first-name-lastname mt-4">
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>From Date</Form.Label>
            <Form.Control
              className="staff-input"
              type="date"
              placeholder="Staff Password"
              name="from_date"
              value={leaveinfo?.from_date}
              onChange={(e) =>
                setleaveinfo({ ...leaveinfo, from_date: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>To Date</Form.Label>
            <Form.Control
              className="staff-input"
              type="date"
              placeholder="Staff Password"
              name="to_date"
              value={leaveinfo?.to_date}
              onChange={(e) =>
                setleaveinfo({ ...leaveinfo, to_date: e.target.value })
              }
            />
          </Form.Group>
        </div>

        <div className="staff-first-name-lastname mt-4">
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>No of Day</Form.Label>
            <Form.Control
              className="staff-input"
              type="text"
              placeholder="No of Day"
              name="no_day"
              value={leaveinfo?.no_day}
              onChange={(e) =>
                setleaveinfo({ ...leaveinfo, no_day: e.target.value })
              }
            />
          </Form.Group>
          <select
            className="mb-3 firstname-staff"
            id="staf-select"
            name="leave_status"
            value={leaveinfo?.leave_status}
            onChange={(e) =>
              setleaveinfo({ ...leaveinfo, leave_status: e.target.value })
            }
          >
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        <div className="staff-first-name-lastname mt-4">
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Reason</Form.Label>
            <Form.Control
              name="reason"
              placeholder="Reason"
              as="textarea"
              rows={3}
              value={leaveinfo?.reason}
              onChange={(e) =>
                setleaveinfo({ ...leaveinfo, reason: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Important Notice for Employee</Form.Label>
            <Form.Control
              name="note"
              placeholder="Reason"
              as="textarea"
              rows={3}
              onBlur={(e) => handlenotice(e.target.value)}
            />
          </Form.Group>
        </div>
        <div className="staff-first-name-lastname mt-4">
          <button className="add-staf--btn" variant="primary" type="submit">
            send Request
          </button>
        </div>
      </Form>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default DashbordLeaveResponse;
