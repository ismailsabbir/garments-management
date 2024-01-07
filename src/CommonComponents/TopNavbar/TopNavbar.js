import React from "react";
import { IoCallOutline, IoLocationOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { FaFacebookF } from "react-icons/fa";
import "./TopNavbar.css";
import {
  AiOutlineTwitter,
  AiOutlineInstagram,
  AiFillYoutube,
} from "react-icons/ai";
import { Link } from "react-router-dom";
const TopNavbar = () => {
  return (
    <div className="top-navbar-con">
      <div className="top-navbar-left">
        <div className="top-navbar-item">
          <IoCallOutline className="navbar-top-icon"></IoCallOutline>
          <p className="navbat-top-text">+123-234-1234</p>
        </div>
        <div className="top-navbar-item">
          <MdOutlineEmail className="navbar-top-icon"></MdOutlineEmail>
          <p className="navbat-top-text">hello@awesomesite.com</p>
        </div>
        <div className="top-navbar-item">
          <IoLocationOutline className="navbar-top-icon"></IoLocationOutline>
          <p className="navbat-top-text">99 Roving St., Big City, PKU 23456</p>
        </div>
      </div>
      <div className="top-navbar-right">
        {/* <Link to="/make-project" className="button" id="make-project-btn">
        wholesale
        </Link> */}
        <p className="socila-icon-p">
          <FaFacebookF className="socila-icon"></FaFacebookF>
        </p>
        <p className="socila-icon-p">
          <AiOutlineTwitter className="socila-icon"></AiOutlineTwitter>
        </p>
        <p className="socila-icon-p">
          <AiOutlineInstagram className="socila-icon"></AiOutlineInstagram>
        </p>
        <p className="socila-icon-p">
          <AiFillYoutube className="socila-icon"></AiFillYoutube>
        </p>
      </div>
    </div>
  );
};

export default TopNavbar;
