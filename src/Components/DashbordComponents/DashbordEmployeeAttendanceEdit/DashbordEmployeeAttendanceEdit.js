import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./DashbordEmployeeAttendanceEdit.css";
const DashbordEmployeeAttendanceEdit = () => {
  const location = useLocation();
  const attendance = location.state;
  const [attendanceData, setattendance] = useState({});
  const [attendance_in_time, setattendance_in_time] = useState(
    attendance?.attendance_in_time
  );
  const [attendance_out_time, setattendance_out_time] = useState(
    attendance?.attendance_out_time
  );
  const [status_in, setstatus_in] = useState(attendance?.status_in);
  const [status_out, setstatus_out] = useState(attendance?.status_out);
  console.log("Dashbord Employee Attendance Edit");
  useEffect(() => {
    setattendance(attendance);
  }, {});
  const handleInTime = (e) => {
    setattendance_in_time(e.target.value);
  };
  const handleOutTime = (e) => {
    setattendance_out_time(e.target.value);
  };
  const handleInStatus = (e) => {
    setstatus_in(e.target.value);
  };
  const handlestatusOut = (e) => {
    setstatus_out(e.target.value);
  };
  const handleEmployeeAttendancedit = (e) => {
    e.preventDefault();
    const attendance_date = attendanceData?.attendance_date;
    const attendance_time = attendanceData?.attendance_time;
    const employee_id = attendanceData?.employee_id;
    const attendanceinfo = {
      employee_id,
      attendance_date,
      attendance_time,
      attendance_in_time,
      attendance_out_time,
      status_in,
      status_out,
    };
    fetch(
      `${process.env.REACT_APP_URL}/edit_employee-attendance/${attendanceData?._id}`,
      {
        method: "PUT",
        body: JSON.stringify(attendanceinfo),
        headers: {
          "Content-type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        toast("Update sucessfully !!!", {
          position: "top-center",
          autoClose: 1000,
        });
      });
  };
  return (
    <div className="add-staff-con">
      <h5>Update Employee Attendance</h5>
      <p>Updated employee information from here</p>
      <div className="edit-employee-attendance">
        <img src={attendanceData?.photo} alt="not fond" />
        <h6>{attendanceData?.name}</h6>
        <p>ID: {attendanceData?.employee_id}</p>
      </div>
      <Form onSubmit={handleEmployeeAttendancedit} className="add-staff-form">
        <div className="staff-first-name-lastname mt-4">
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Employee In Time</Form.Label>
            <select
              className="product-category"
              name="in_time"
              onChange={handleInTime}
            >
              <option selected value={attendanceData?.attendance_in_time}>
                {attendanceData?.attendance_in_time}
              </option>
              <option value="08:00 AM">08:00 AM</option>
              <option value="09:00 AM">09:00 AM</option>
              <option value="10:00 AM">10:00 AM</option>
              <option value="11:00 AM">11:00 AM</option>
              <option value="12:00 AM">12:00 AM</option>
            </select>
          </Form.Group>
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Employee Out Time</Form.Label>
            <select
              className="product-category"
              name="color"
              onChange={handleOutTime}
            >
              <option selected value={attendanceData?.attendance_out_time}>
                {attendanceData?.attendance_out_time}
              </option>
              <option value="13:00 PM">13:00 PM</option>
              <option value="14:00 PM">14:00 PM</option>
              <option value="15:00 PM">15:00 PM</option>
              <option value="16:00 PM">16:00 PM</option>
              <option value="17:00 PM">17:00 PM</option>
            </select>
          </Form.Group>
        </div>
        <div className="staff-first-name-lastname mt-4">
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Employee In Status</Form.Label>
            <select
              value={status_in}
              className="product-category"
              name="color"
              onChange={handleInStatus}
            >
              <option value="present">Presense</option>
              <option value="absence">Absense</option>
            </select>
          </Form.Group>
          <Form.Group className="mb-3 firstname-staff">
            <Form.Label>Employee Out Status</Form.Label>
            <select
              value={status_out}
              className="product-category"
              name="color"
              onChange={handlestatusOut}
            >
              <option value="present">Presense</option>
              <option value="absence">Absense</option>
            </select>
          </Form.Group>
        </div>

        <div className="staff-first-name-lastname mt-4 m-0-auto">
          <button className="add-staf--btn" variant="primary" type="submit">
            UPDATE ATTENDANCE INFORMATION
          </button>
        </div>
      </Form>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default DashbordEmployeeAttendanceEdit;
