import React, { useContext, useState } from "react";
import { Form } from "react-bootstrap";
import { BiLogoGmail } from "react-icons/bi";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Context/UserContext";
const EmployeeSignup = () => {
  const { createuser } = useContext(AuthContext);
  const [errormessage, seterrormessage] = useState("");
  const [sucessmessage, setsucessmessage] = useState(false);
  console.log("Employee Sign up");
  const handleregister = (e) => {
    e.preventDefault();
    setsucessmessage(false);
    const form = e.target;
    const email = e.target.email.value;
    const password = e.target.password.value;
    fetch(
      `${process.env.REACT_APP_URL}/staff/check?email=${email}&password=${password}`
    )
      .then((req) => req.json())
      .then((data) => {
        if (data?.isStaff === true) {
          const name = data?.name;
          const userdata = { name, email };
          createuser(email, password)
            .then((req) => {
              setsucessmessage(true);
              seterrormessage("");
              form.reset();
              fetch(`${process.env.REACT_APP_URL}/users`, {
                method: "POST",
                body: JSON.stringify(userdata),
                headers: {
                  "Content-type": "application/json",
                },
              })
                .then((req) => req.json())
                .then((data) => {});
            })
            .catch((error) => {
              seterrormessage(error.message);
            });
        } else {
          setsucessmessage(false);
          seterrormessage("Email/password is not correct as employee");
        }
      });
  };
  return (
    <div className="employss-login-con">
      <div className="signup-right" id="employee-login">
        <div className="alreday-link">
          <Link className="signup-link" to="/employee/Login">
            ALREADY A MEMBER
          </Link>
          <Link className="signup-link" to="/employee/signup">
            I AM NEW HERE
          </Link>
        </div>
        <Form onSubmit={handleregister}>
          {sucessmessage ? (
            <div className="alert alert-success">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Employee SignUp sucessfully!!!!</span>
            </div>
          ) : (
            <></>
          )}
          <input
            className="signup-input"
            name="email"
            type="email"
            placeholder="EMAIL ADDRESSS"
          />
          <input
            className="signup-input"
            type="password"
            name="password"
            placeholder="PASSWORD"
          />
          <div className="mid-login">
            <label className="cursor-pointer label">
              <input
                type="checkbox"
                checked="checked"
                className="checkbox checkbox-success mr-2"
              />
              <span className="label-text">Remember me</span>
            </label>
          </div>
          {errormessage ? (
            <div className="alert alert-warning">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>{errormessage}</span>
            </div>
          ) : (
            <></>
          )}
          <button type="submit" className="signup-btn">
            <BiLogoGmail className="gmail-icon"></BiLogoGmail>
            Sign Up with email
          </button>
        </Form>
      </div>
    </div>
  );
};

export default EmployeeSignup;
