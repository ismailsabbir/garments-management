import React from "react";
import { LuPhoneCall } from "react-icons/lu";
import { TfiEmail, TfiWorld } from "react-icons/tfi";
import { FaMapLocationDot } from "react-icons/fa6";

import "./ContactMedia.css";
const ContactMedia = () => {
  return (
    <div className="contact-media-con">
      <div className="phone-con">
        <div className="phone-left">
          <LuPhoneCall className="media-icon"></LuPhoneCall>
        </div>
        <div className="phone-right">
          <h5>Phone</h5>
          <p>01888259154</p>
        </div>
      </div>
      <div className="phone-con">
        <div className="phone-left">
          <TfiEmail className="media-icon"></TfiEmail>
        </div>
        <div className="phone-right">
          <h5>Email</h5>
          <p>hello@awesomesite.com</p>
        </div>
      </div>
      <div className="phone-con">
        <div className="phone-left">
          <TfiWorld className="media-icon"></TfiWorld>
        </div>
        <div className="phone-right">
          <h5>Website</h5>
          <p>www.awesomesite.com</p>
        </div>
      </div>
      <div className="phone-con">
        <div className="phone-left">
          <FaMapLocationDot className="media-icon"></FaMapLocationDot>
        </div>
        <div className="phone-right">
          <h5>Address</h5>
          <p>99 Roving St., Big City, PKU 2345</p>
        </div>
      </div>
    </div>
  );
};

export default ContactMedia;
