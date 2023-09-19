import React, { useContext } from "react";
import logo from "../../Images/Logo.png";
import { CgGoogle } from "react-icons/cg";
import { BiLogoFacebook, BiLogoGmail } from "react-icons/bi";

import "./SignupPages.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/UserContext";
const SignupPages = () => {
  const { createuser } = useContext(AuthContext);
  console.log(createuser);
  const handleregister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    createuser(email, password)
      .then((req) => {
        console.log(req.user);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(name, email, password);
  };
  return (
    <div className="sign-page-con">
      <div className="signup-con">
        <div className="signup-left bg-neutral">
          <img src={logo} alt="not" />
          <p>Login using social media to get quick access</p>
          <button className="google-btn" id="google">
            <CgGoogle className="signup-icon"></CgGoogle>
            Signin with Google
          </button>
          <button className="google-btn">
            <BiLogoFacebook className="signup-icon"></BiLogoFacebook>
            Signin with Facebook
          </button>
        </div>
        <div className="signup-right">
          <div className="alreday-link">
            <Link className="signup-link" to="/Login">
              ALREADY A MEMBER
            </Link>
            <Link className="signup-link" to="/SignUp">
              I AM NEW HERE
            </Link>
          </div>

          <form onSubmit={handleregister}>
            <input
              className="signup-input"
              name="email"
              type="text"
              placeholder="EMAIL ADDRESSS"
            />
            <input
              className="signup-input"
              type="text"
              name="name"
              placeholder="FULL NAME"
            />
            <input
              className="signup-input"
              type="text"
              name="password"
              placeholder="PASSWORD"
            />
            <button type="submit" className="signup-btn">
              <BiLogoGmail className="gmail-icon"></BiLogoGmail>
              Sign up with email
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPages;
