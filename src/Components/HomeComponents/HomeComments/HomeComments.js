import React from "react";
import { FaCommentDots } from "react-icons/fa";
import image from "../../../Images/user.jpg";
import "./HomeComments.css";
const HomeComments = () => {
  return (
    <div className="comments-con">
      <div className="comments">
        <FaCommentDots className="comments-icon"></FaCommentDots>
        <p>
          "This garment is a perfect blend of style and comfort. The quality is
          outstanding, and I love how it enhances my look effortlessly."
        </p>
        <div className="user-image">
          <img src={image} alt="not found" />
        </div>
      </div>
    </div>
  );
};

export default HomeComments;
