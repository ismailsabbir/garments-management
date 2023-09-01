import React from "react";
import "./SocialMediaList.css";
import { FaFacebookF } from "react-icons/fa6";
import {
  AiFillYoutube,
  AiOutlineInstagram,
  AiOutlineTwitter,
} from "react-icons/ai";
const SocialMediaList = () => {
  return (
    <div className="services-list-con bg-neutral">
      <h4>Our Social Media</h4>
      <div className="social-medi-list">
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

export default SocialMediaList;
