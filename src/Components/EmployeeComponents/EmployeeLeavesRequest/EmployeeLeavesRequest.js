import React, { useContext } from "react";
import "./EmployeeLeavesRequest.css";
import { Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { EmployeeContext } from "./../../../Layouts/EmployeeLayouts/EmployeeLayouts";
const EmployeeLeavesRequest = () => {
  const employee = useContext(EmployeeContext);
  console.log("Employee Leave Request");
  const handlestaffadd = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const apply_date = e.target.apply_date.value;
    const from_date = e.target.from_date.value;
    const to_date = e.target.to_date.value;
    const half_day = e.target.half_day.value;
    const leave_type = e.target.leave_type.value;
    const leave_status = e.target.leave_status.value;
    const reason = e.target.reason.value;
    const randomNumber = Math.floor(Math.random() * 99999) + 1;
    const request_number = `R-${String(randomNumber).padStart(5, "0")}`;
    const leaveinfo = {
      name,
      email,
      apply_date,
      from_date,
      to_date,
      half_day,
      leave_status,
      leave_type,
      reason,
      request_number,
    };
    fetch(`${process.env.REACT_APP_URL}/leave/Request`, {
      method: "POST",
      body: JSON.stringify(leaveinfo),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.sucess) {
          toast("Requested sucessfully !!!", {
            position: "top-center",
            autoClose: 1000,
          });
        } else {
          toast("Requested Failed !!!", {
            position: "top-center",
            autoClose: 1000,
          });
        }
      });
  };
  return (
    <div className="add-staff-con">
      <h5>New Leave Request</h5>
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
              value={employee?.name}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Email</Form.Label>
            <Form.Control
              className="staff-input"
              type="email"
              placeholder="Staff Email"
              name="email"
              value={employee?.email}
              required
            />
          </Form.Group>
        </div>

        <div className="staff-first-name-lastname mt-4">
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Apply Date</Form.Label>
            <Form.Control
              className="staff-input"
              type="date"
              placeholder="Staff Password"
              name="apply_date"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>From Date</Form.Label>
            <Form.Control
              className="staff-input"
              type="date"
              placeholder="Staff Password"
              name="from_date"
              required
            />
          </Form.Group>
        </div>
        <div className="staff-first-name-lastname mt-4">
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>To Date</Form.Label>
            <Form.Control
              className="staff-input"
              type="date"
              placeholder="Staff Password"
              name="to_date"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Half Day</Form.Label>
            <Form.Control
              className="staff-input"
              type="text"
              placeholder="Yes/No"
              name="half_day"
              required
            />
          </Form.Group>
        </div>
        <div className="staff-first-name-lastname mt-4">
          <select
            className="mb-3 firstname-staff"
            id="staf-select"
            name="leave_type"
            required
          >
            <option value="Casual Leave">Casual Leave</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Privilege Leave">Privilege Leave</option>
            <option value="Marriage Leave">Marriage Leave</option>
            <option value="Maternity Leave">Maternity Leave</option>
          </select>
          <select
            className="mb-3 firstname-staff"
            id="staf-select"
            name="leave_status"
            required
          >
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
            <option value="Pending">Pending</option>
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
              required
            />
          </Form.Group>
          <button className="add-staf--btn" variant="primary" type="submit">
            Send Request For Leave
          </button>
        </div>
      </Form>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default EmployeeLeavesRequest;
