import React, { useContext } from "react";
import "./HomeBlogs.css";
import { servcontext } from "../../../App";
import SingleBlog from "../SingleBlog/SingleBlog";
import { Link } from "react-router-dom";
const HomeBlogs = () => {
  const { blogs } = useContext(servcontext);
  const newblogs = blogs?.slice(0, 3);
  console.log("Home Blog");
  return (
    <div className="home-blog-con">
      <div className="homeservices-top" id="home-project-top">
        <h5>BLOG</h5>
        <h1>Blog & Articles</h1>
        <p>
          Nulla in nibh at leo faucibus molestie eget nec velit. Phasellus vel
          felis vel orci iaculis tempor tristique sagittis urna. Phasellus ac
          ante in lacus tempor egestas.
        </p>
      </div>
      <div className="home-servicess row">
        {newblogs?.map((blog) => (
          <SingleBlog blog={blog} key={blog?._id}></SingleBlog>
        ))}
      </div>
      <div className="view_all_blog_btn">
        <Link to="/blog" className="view_all_blog_link">
          VIEW ALL BLOGS
        </Link>
      </div>
    </div>
  );
};

export default HomeBlogs;
