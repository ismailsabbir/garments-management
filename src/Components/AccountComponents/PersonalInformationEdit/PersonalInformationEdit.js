import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../../Context/UserContext";
import { Form } from "react-bootstrap";
import { useEffect } from "react";
import { useState } from "react";
import Loading from "../../../CommonComponents/Loading/Loading";
import "./PersonalInformationEdit.css";
import { Navigate, useNavigate } from "react-router-dom";
const PersonalInformationEdit = () => {
  const { user, userlogout } = useContext(AuthContext);
  const navigate = useNavigate();
  // const [userinfo, setuser] = useState();
  const [loading, setLoading] = useState(false);
  const day = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
  ];
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const years = [];
  for (let year = currentYear; year >= 1900; year--) {
    years.push(year);
  }
  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_URL}/user?email=${user?.email}`, {
  //     headers: {
  //       authorization: `Beare ${localStorage.getItem("garments-token")}`,
  //     },
  //   })
  //     .then((res) => {
  //       if (res.status === 401 || res.status === 403) {
  //         return userlogout();
  //       }
  //       return res.json();
  //     })
  //     .then((jsonData) => {
  //       setuser(jsonData);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("Failed to fetch data:", error);
  //       setLoading(false);
  //     });
  // }, [user?.email, userlogout]);
  const handlechange = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const mobile = e.target.mobile.value;
    const month = e.target.month.value;
    const day = e.target.day.value;
    const year = e.target.year.value;
    const gender = e.target.gender.value;
    const birth = `${month}/${day}/${year}`;
    const data = { name, mobile, birth, gender };
    fetch(`${process.env.REACT_APP_URL}/userupdate?email=${user?.email}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((req) => req.json())
      .then((data) => {
        if (data.modifiedCount >= 1) {
          navigate("/manage_account/my-profile");
        }
      });
  };
  return (
    <div className="information-edit-con">
      {loading ? (
        <Loading></Loading>
      ) : (
        <Form onSubmit={handlechange}>
          <h5 className="mb-8">Edit Profile</h5>
          <div className="info-name-email">
            <Form.Group
              className="mb-3 name-info-edit"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder={user?.displayName}
                name="name"
              />
            </Form.Group>
            <Form.Group
              className="mb-3 email-info-edit"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="text"
                placeholder="Mobile Number"
                name="mobile"
              />
            </Form.Group>
          </div>
          <div className="birth-gender">
            <div className="birth-con">
              <p>Birthday</p>
              <div className="birthday-select">
                <select
                  name="month"
                  className="selectm select-bordered w-full max-w-xs"
                >
                  {/* <option disabled selected>
                    Month
                  </option> */}
                  <option>January</option>
                  <option>February</option>
                  <option>March</option>
                  <option>April</option>
                  <option>May</option>
                  <option>June</option>
                  <option>July</option>
                  <option>August</option>
                  <option>September</option>
                  <option>October</option>
                  <option>November</option>
                  <option>December</option>
                </select>
                <select
                  name="day"
                  className="selectm select-bordered w-full max-w-xs"
                >
                  {/* <option disabled selected>
                    Day
                  </option> */}
                  {day?.map((aday) => (
                    <option>{aday}</option>
                  ))}
                </select>
                <select
                  name="year"
                  className="selectm select-bordered w-full max-w-xs"
                >
                  {/* <option disabled selected>
                    Year
                  </option> */}
                  {years?.map((ayear) => (
                    <option>{ayear}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="gender-con">
              <p>Gender</p>
              <select
                name="gender"
                className="selectgrnder select-bordered w-full max-w-xs"
              >
                {/* <option disabled selected>
                  Gender
                </option> */}
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
          </div>
          <div className="info-change-con">
            <button type="submit">SAVE CHANGE</button>
          </div>
        </Form>
      )}
    </div>
  );
};

export default PersonalInformationEdit;
