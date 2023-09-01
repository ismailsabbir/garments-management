import React from "react";
import { MdArrowRightAlt } from "react-icons/md";
import { AiOutlineCalendar } from "react-icons/ai";
import { BiMessage } from "react-icons/bi";

import { Link } from "react-router-dom";
import "./SingleBlog.css";
const SingleBlog = ({ blog }) => {
  return (
    <Link
      className="blog-info col col-12 col-sm-12 col-md-4 col-lg-3"
      id="blog-info"
    >
      <img className="blog-image" src={blog.image} alt="not" />

      <div className="blog-bottom bg-neutral">
        <h5>{blog?.name?.slice(0, 40)}...</h5>
        <div className="blog-date-comments">
          <div className="blog-date">
            <AiOutlineCalendar></AiOutlineCalendar>
            <p>{blog?.date}</p>
          </div>
          <div className="blog-comments">
            <BiMessage></BiMessage>
            <p>{blog?.comments?.length}</p>
          </div>
        </div>
        <p>{blog?.para1?.slice(0, 110)}...</p>
        <Link className="read-more-btn" id="blog-read-more">
          Read More
          <MdArrowRightAlt className="right-arrow-sign"></MdArrowRightAlt>{" "}
        </Link>
      </div>
    </Link>
  );
};

export default SingleBlog;
