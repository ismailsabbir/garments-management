import React from "react";
import { useLocation } from "react-router-dom";

const DashbordBlogsView = () => {
  const location = useLocation();
  const blog = location.state;
  return (
    <div>
      <div className="blog_details_text">
        <h1 className="blog_details_title">{blog?.name}</h1>
        <img className="blog_details_img" src={blog?.image} alt="" />
        <p className="blog_paragrap">{blog?.para1}</p>
        <p className="blog_paragrap">{blog?.para2}</p>
        <p className="blog_paragrap">{blog?.para3}</p>
        <p className="blog_paragrap">{blog?.para4}</p>
      </div>
    </div>
  );
};

export default DashbordBlogsView;
