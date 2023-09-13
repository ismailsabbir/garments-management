import React from "react";
import logo from "../../Images/Logo.png";
import { CgGoogle } from "react-icons/cg";
import { BiLogoFacebook, BiLogoGmail } from "react-icons/bi";

import "./SignupPages.css";
import { Link } from "react-router-dom";
const SignupPages = () => {
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
          <input
            className="signup-input"
            type="text"
            placeholder="EMAIL ADDRESSS"
          />
          <input className="signup-input" type="text" placeholder="FULL NAME" />
          <input className="signup-input" type="text" placeholder="PASSWORD" />
          <button className="signup-btn">
            <BiLogoGmail className="gmail-icon"></BiLogoGmail>
            Sign up with email
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupPages;
