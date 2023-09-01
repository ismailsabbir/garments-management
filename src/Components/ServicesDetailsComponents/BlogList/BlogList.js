import React, { useContext } from "react";
import "./BlogList.css";
import { servcontext } from "../../../App";
import { Link } from "react-router-dom";
const BlogList = () => {
  const { blogs } = useContext(servcontext);
  const recentblog = blogs.slice(0, 3);
  return (
    <div className="services-list-con bg-neutral">
      <h4>Recent Blog</h4>
      {recentblog?.map((blog) => (
        <div className="services-process">
          <Link to={`/serviceDetails/${blog?._id}`} className="blog-list">
            <img src={blog?.image} alt="not found" />
            <p> {blog?.name?.slice(0, 28)}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
